import React from 'react';

const ContactBtn = () => {
    return (
        <a 
            href='mailto:singhvanshaj09@gmail.com'
            target='_blank'
            rel='noopener noreferrer' // Added for security
            className="font-sans flex justify-center items-center mx-auto shadow-xl text-lg text-black md:text-gray-50 backdrop-blur-md relative overflow-hidden rounded-full group"
        >
            <span className='barlow capitalize md:border-2 bg-white md:bg-transparent rounded-full py-[0.15rem] px-3 md:px-2 md:group-hover:bg-white md:group-hover:text-black transition-all duration-300'>
                contact me
            </span>
            <svg
                viewBox="0 0 16 19"
                className="md:w-[2.2rem] md:h-[2.2rem] h-8 w-8 justify-end md:group-hover:rotate-45 md:border-2 md:text-gray-50 ease-linear duration-300 rounded-full md:bg-transparent bg-white md:border-white md:group-hover:border-white md:group-hover:bg-white p-2 rotate-45 md:rotate-90"
            >
                <path
                    className="md:fill-white md:group-hover:fill-black"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                />
            </svg>
        </a>
    );
};

export default ContactBtn;