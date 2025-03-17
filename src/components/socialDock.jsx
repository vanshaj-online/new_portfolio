import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from "react";

function DockItem({ children, className = "", mouseX, spring, distance, magnification, baseItemSize, link }) {

    const ref = useRef(null);

    const [isDownload, setisDownload] = useState(false)

    useEffect(() => {

        if (link.includes('resume')) setisDownload(true)

    }, [])



    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize,
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    );
    const size = useSpring(targetSize, spring);

    return (
        <motion.a
            ref={ref}
            style={{
                width: size,
                height: size,
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            href={link}
            target="_blank"
            download={isDownload ? "" : undefined}
            className={`relative inline-flex items-center justify-center rounded-xl bg-white/5 ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, (child) =>
                cloneElement(child, { isHovered })
            )}
        </motion.a>
    );
}

function DockLabel({ children, className = "", ...rest }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on("change", (latest) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${className} absolute flex items-center justify-center  -top-6 left-1/2 w-fit whitespace-pre rounded-full bg-[#f5f5dc] text-black barlow-bold font-semibold capitalize px-2 py-0.5 text-xs`}
                    role="tooltip"
                    style={{ x: "-50%" }}
                >
                    {children}
                    <IoIosArrowRoundForward className="rotate-[-50deg] text-base" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = "" }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {children}
        </div>
    );
}

export default function Dock({ items, className = "", spring = { mass: 0.1, stiffness: 150, damping: 12 }, magnification = 70, distance = 200, panelHeight = 64, dockHeight = 256, baseItemSize = window.innerWidth >= 425 ? 50 : 40 }) {

    const mouseX = useMotionValue(Infinity);

    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    return (
        <motion.div
            style={{ scrollbarWidth: "none" }}
            className="flex w-full justify-center items-center"

        >
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={`${className} flex items-end justify-evenly w-full`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        link={item.link}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
