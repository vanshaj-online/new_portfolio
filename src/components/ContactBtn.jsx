import React from 'react';
import { Link } from 'react-router';


const ContactBtn = ({ children, link='mailto:singhvanshaj09@gmail.com' }) => {

    return (
        <Link
            to={link}
            rel='noopener noreferrer' // Added for security
            className="font-sans flex justify-center items-center mx-auto  text-lg text-gray-50  relative overflow-hidden rounded-full group w-max"
        >
            <span className='barlow capitalize border-2 text-sm rounded-full py-1 sm:text-base lg:text-lg md:py-[0.15rem] px-3 group-hover:bg-white group-hover:text-black transition-all duration-300 backdrop-blur-md '>
                {children}
            </span>
            <svg
                viewBox="0 0 16 19"
                className=" h-8 lg:h-[2.2rem] w-auto aspect-square justify-end group-hover:rotate-45 border-2 text-gray-50 ease-linear duration-300 rounded-full bg-transparent border-white group-hover:border-white group-hover:bg-white p-2 rotate-90 backdrop-blur-md "
            >
                <path
                    className="fill-white group-hover:fill-black"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                />
            </svg>
        </Link>
    );
};

export default ContactBtn;