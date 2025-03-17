import gsap from 'gsap';
import React, { useState, useEffect, useRef } from 'react';

const Preloader = ({ onComplete, children }) => {
  const [progress, setProgress] = useState(0);
  const loader = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadStatus, setLoadStatus] = useState({
    fonts: { loaded: 0, total: 0, complete: false },
    images: { loaded: 0, total: 0, complete: false },
    models: { loaded: 0, total: 0, complete: false }
  });

  // Font loading using FontFaceObserver
  useEffect(() => {
    const loadFonts = async () => {
      // Dynamic import FontFaceObserver (only when needed)
      const FontFaceObserver = await import('fontfaceobserver').then(module => module.default);

      // Get all font families from CSS
      const fontFamilies = [];
      for (const sheet of document.styleSheets) {
        try {
          const rules = sheet.cssRules || sheet.rules || [];
          for (const rule of rules) {
            if (rule.type === CSSRule.FONT_FACE_RULE && rule.style.fontFamily) {
              const family = rule.style.fontFamily.replace(/['"]+/g, '');
              if (!fontFamilies.includes(family)) {
                fontFamilies.push(family);
              }
            }
          }
        } catch (e) {
          console.warn('Cannot access stylesheet rules', e);
        }
      }

      // Update total fonts count
      setLoadStatus(prev => ({
        ...prev,
        fonts: { ...prev.fonts, total: fontFamilies.length }
      }));

      if (fontFamilies.length === 0) {
        setLoadStatus(prev => ({
          ...prev,
          fonts: { ...prev.fonts, complete: true }
        }));
        return;
      }

      // Load each font and track progress
      const fontPromises = fontFamilies.map(family => {
        const font = new FontFaceObserver(family);
        return font.load(null, 5000)
          .then(() => {
            setLoadStatus(prev => {
              const newFonts = {
                ...prev.fonts,
                loaded: prev.fonts.loaded + 1
              };
              return {
                ...prev,
                fonts: {
                  ...newFonts,
                  complete: newFonts.loaded === newFonts.total
                }
              };
            });
          })
          .catch(err => {
            console.error(`Font ${family} failed to load:`, err);
            // Still count as "loaded" to prevent stalling the preloader
            setLoadStatus(prev => {
              const newFonts = {
                ...prev.fonts,
                loaded: prev.fonts.loaded + 1
              };
              return {
                ...prev,
                fonts: {
                  ...newFonts,
                  complete: newFonts.loaded === newFonts.total
                }
              };
            });
          });
      });

      await Promise.all(fontPromises);
    };

    loadFonts();
  }, []);

  // Image loading
  useEffect(() => {
    // Function to preload all images in the document
    const preloadImages = () => {
      // Get all image elements and background images
      const imgElements = Array.from(document.querySelectorAll('img'));
      const elementsWithBgImage = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return style.backgroundImage !== 'none' && !style.backgroundImage.includes('gradient');
      });

      // Extract image URLs from background-image styles
      const bgImageUrls = elementsWithBgImage.map(el => {
        const style = window.getComputedStyle(el);
        const bgImg = style.backgroundImage;
        // Extract URL from "url('...')" format
        const match = bgImg.match(/url\(['"]?([^'"]+)['"]?\)/);
        return match ? match[1] : null;
      }).filter(Boolean);

      // Get image sources from img elements
      const imgSources = imgElements
        .map(img => img.src || img.dataset.src)
        .filter(Boolean);

      // Combine all unique image URLs
      const allImageUrls = [...new Set([...imgSources, ...bgImageUrls])];

      // Update total images count
      setLoadStatus(prev => ({
        ...prev,
        images: { ...prev.images, total: allImageUrls.length }
      }));

      if (allImageUrls.length === 0) {
        setLoadStatus(prev => ({
          ...prev,
          images: { ...prev.images, complete: true }
        }));
        return;
      }

      // Load each image
      allImageUrls.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = () => {
          setLoadStatus(prev => {
            const newImages = {
              ...prev.images,
              loaded: prev.images.loaded + 1
            };
            return {
              ...prev,
              images: {
                ...newImages,
                complete: newImages.loaded === newImages.total
              }
            };
          });
        };
        img.src = src;
      });
    };

    preloadImages();
  }, []);

  // 3D model loading using Three.js
  useEffect(() => {

    const load3DModels = async () => {
      // Search for model sources in data attributes
      const modelElements = Array.from(document.querySelectorAll('[data-model-src]'));
      const modelUrls = modelElements.map(el => el.dataset.modelSrc).filter(Boolean);

      // Update total models count
      setLoadStatus(prev => ({
        ...prev,
        models: { ...prev.models, total: modelUrls.length }
      }));

      if (modelUrls.length === 0) {
        setLoadStatus(prev => ({
          ...prev,
          models: { ...prev.models, complete: true }
        }));
        return;
      }

      try {
        // Dynamically import Three.js and GLTFLoader only when needed
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
        const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');

        const gltfLoader = new GLTFLoader();
        const objLoader = new OBJLoader();
        const fbxLoader = new FBXLoader();

        // Load each model
        const modelPromises = modelUrls.map(url => {
          return new Promise((resolve) => {
            // Determine loader based on file extension
            const extension = url.split('.').pop().toLowerCase();
            let loader;

            switch (extension) {
              case 'gltf':
              case 'glb':
                loader = gltfLoader;
                break;
              case 'obj':
                loader = objLoader;
                break;
              case 'fbx':
                loader = fbxLoader;
                break;
              default:
                console.warn(`Unsupported model format: ${extension}`);
                // Still resolve to prevent stalling
                setLoadStatus(prev => {
                  const newModels = {
                    ...prev.models,
                    loaded: prev.models.loaded + 1
                  };
                  return {
                    ...prev,
                    models: {
                      ...newModels,
                      complete: newModels.loaded === newModels.total
                    }
                  };
                });
                resolve();
                return;
            }

            loader.load(
              url,
              () => {
                setLoadStatus(prev => {
                  const newModels = {
                    ...prev.models,
                    loaded: prev.models.loaded + 1
                  };
                  return {
                    ...prev,
                    models: {
                      ...newModels,
                      complete: newModels.loaded === newModels.total
                    }
                  };
                });
                resolve();
              },
              // Progress callback
              (xhr) => {
                // We don't update individual model progress here,
                // just track complete/incomplete
              },
              // Error callback
              (error) => {
                console.error(`Error loading model ${url}:`, error);
                setLoadStatus(prev => {
                  const newModels = {
                    ...prev.models,
                    loaded: prev.models.loaded + 1
                  };
                  return {
                    ...prev,
                    models: {
                      ...newModels,
                      complete: newModels.loaded === newModels.total
                    }
                  };
                });
                resolve();
              }
            );
          });
        });

        await Promise.all(modelPromises);
      } catch (error) {
        console.error("Error loading 3D module:", error);
        // Mark all models as loaded to prevent preloader from stalling
        setLoadStatus(prev => ({
          ...prev,
          models: {
            ...prev.models,
            loaded: prev.models.total,
            complete: true
          }
        }));
      }
    };

    load3DModels();

  }, []);

  // Calculate overall progress
  useEffect(() => {
    const { fonts, images, models } = loadStatus;

    // Calculate total items and loaded items
    const totalItems = fonts.total + images.total + models.total;
    const loadedItems = fonts.loaded + images.loaded + models.loaded;

    // Calculate progress percentage (avoid division by zero)
    const percentage = totalItems > 0 ? Math.floor((loadedItems / totalItems) * 100) : 100;

    setProgress(percentage);

    // Check if everything is complete
    const isComplete = fonts.complete && images.complete && models.complete;

    if (isComplete && percentage === 100) {
      // Add a small delay to allow for any final renders
      setTimeout(() => {
        setIsLoaded(true);
        if (onComplete) onComplete();
      }, 1000);
    }

    const ctx = gsap.context(() => {
      if (!loader.current) return;

      setTimeout(() => {

        gsap.to(loader.current, {
          width: `${progress + 5}%`,
          duration: 0.4,
          ease: "power2.out"  // Add easing for smoother animation
        });

      }, 500);
    });

    return () => ctx.revert();

  }, [loadStatus, onComplete, progress]);

  return (
    <>
      {!isLoaded ? (
        <div className="h-screen w-full pointer-events-none flex items-center justify-center absolute inset-0 bg-black">

          <div className='bg-neutral-800 w-20 h-[2px] rounded-full flex items-start justify-start'>
            <span ref={loader} className='bg-neutral-200 h-full origin-left min-w-2 inline-block rounded-full z-10'></span>
          </div>

        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Preloader;