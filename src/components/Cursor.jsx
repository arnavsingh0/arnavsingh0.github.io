import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Motion values for raw, instant movement (0 latency)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        // Check if device has a fine pointer (mouse/trackpad)
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!isFinePointer) return;

        const updateMousePosition = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", updateMousePosition);

        // Add event listeners for hoverable elements
        const hoverables = document.querySelectorAll("a, button, .cursor-pointer");
        hoverables.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // MutationObserver to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    const newHoverables = document.querySelectorAll("a, button, .cursor-pointer");
                    newHoverables.forEach((el) => {
                        el.removeEventListener("mouseenter", handleMouseEnter);
                        el.removeEventListener("mouseleave", handleMouseLeave);
                        el.addEventListener("mouseenter", handleMouseEnter);
                        el.addEventListener("mouseleave", handleMouseLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            hoverables.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            observer.disconnect();
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                width: isHovering ? "60px" : "12px",
                height: isHovering ? "60px" : "12px",
                backgroundColor: isHovering ? "transparent" : "white",
                border: isHovering ? "2px solid white" : "0px solid transparent",
            }}
            transition={{
                type: "tween",
                ease: "backOut",
                duration: 0.2,
            }}
        />
    );
};

export default Cursor;
