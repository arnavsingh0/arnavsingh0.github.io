import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Carousel = ({ children }) => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === "left" ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative group/carousel">
            {/* Left Fade */}
            {showLeftArrow && (
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/80 to-transparent z-40 pointer-events-none" />
            )}

            {/* Left Arrow */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 text-white hover:bg-black/80 opacity-0 group-hover/carousel:opacity-100 md:opacity-0 transition-opacity rounded-r-xl hidden md:block"
                >
                    <FaChevronLeft size={24} />
                </button>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-6 pb-12 pt-4 px-2 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {children}
            </div>

            {/* Right Fade */}
            {showRightArrow && (
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-40 pointer-events-none" />
            )}

            {/* Right Arrow */}
            {showRightArrow && (
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 text-white hover:bg-black/80 opacity-0 group-hover/carousel:opacity-100 md:opacity-0 transition-opacity rounded-l-xl hidden md:block"
                >
                    <FaChevronRight size={24} />
                </button>
            )}
        </div>
    );
};

export default Carousel;
