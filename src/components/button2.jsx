import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router";

// Function to combine className strings
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const InteractiveHoverButton = React.forwardRef(
  ({ link, children, className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={link}
        className={cn(
          "group w-auto cursor-pointer overflow-hidden rounded-full border bg-transparent p-2 px-5 text-center font-semibold",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]"></div>
          <span className="inline-block transition-all uppercase text-sm barlow-bold duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </div>
        <div className="absolute top-0 z-10 flex h-full w-full left-full items-center justify-center gap-2 text-black barlow-bold opacity-0 uppercase text-sm transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100">
          <span>{children}</span>
          <IoIosArrowRoundForward />
        </div>
      </Link>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;