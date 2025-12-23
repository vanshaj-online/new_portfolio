import { Link } from 'react-router'
import { MdArrowOutward } from "react-icons/md";

function animatedBtn({ className, children }) {

    return (
        <Link
            className={`text-base overflow-hidden hover:bg-[#f5f5dc] group gap-4 mt-8 flex items-center border-2 p-1 rounded-full mix-blend-difference transition-all duration-300`}
            to='mailto:singhvanshaj09@gmail.com'
        >

            <h3
                className={`${className} inline-block relative overflow-hidden group-hover:text-black font-medium transition-all pl-3 duration-300`}
            >

                {children}

            </h3>

            <span
                className='border-2 bg-[#f5f5dc] rounded-full p-0.5 inline-block group-hover:border-[#c2a55f] group-hover:bg-[#c2a55f] transition-all duration-300'
            >
                <MdArrowOutward className='text-2xl text-[#c2a55f] group-hover:text-[#f5f5dc] transition-all duration-300' />

            </span>

        </Link>
    )
}

export default animatedBtn