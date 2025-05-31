import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useInView } from "framer-motion";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)", 
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      gsap.fromTo(
        ".card",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }
  }, [isInView, animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (
    baseTransform: string,
    offsetX: number
  ): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = window.innerWidth < 768 ? 
          (i < hoveredIdx ? -80 : 80) :
          (i < hoveredIdx ? -160 : 160);
          
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)", 
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      const selector = `.card-${i}`;
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative my-8 flex items-center justify-center ${className}`}
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`card card-${idx} absolute w-[250px] sm:w-[250px] md:w-[350px] aspect-square border-4 sm:border-6 md:border-8 border-white rounded-[15px] sm:rounded-[20px] md:rounded-[30px] overflow-hidden`}
            style={{
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transform: transformStyles[idx] || "none",
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              className="w-full h-full object-cover"
              src={src}
              alt={`card-${idx}`}
            />
          </div>
        ))}
      </div>
      {/* Modal xem ảnh lớn */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[1001] bg-black/80 flex items-center justify-center p-2 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute inset-0 bg-white/90 z-0" />
          <div className="relative max-w-3xl w-full flex flex-col items-center z-10" onClick={e => e.stopPropagation()}>
            <img
              src={images[selectedIndex]}
              alt={`Preview ${selectedIndex + 1}`}
              className="max-h-[70vh] w-auto rounded-xl shadow-2xl object-contain"
            />
            <button
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Prev/Next buttons */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2"
                  onClick={() => setSelectedIndex((selectedIndex - 1 + images.length) % images.length)}
                >
                  <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white rounded-full p-2"
                  onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
                >
                  <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
