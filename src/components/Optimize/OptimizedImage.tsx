import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  priority?: boolean;
  enableZoom?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  priority = false,
  enableZoom = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    if (!priority) {
      img.loading = 'lazy';
    }
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  const containerStyle = {
    position: 'relative' as const,
    width: width || '100%',
    height: height || '100%',
    backgroundColor: placeholderColor,
    overflow: 'hidden' as const,
  };

  return (
    <div style={containerStyle} className={`relative ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 image-placeholder"
          />
        )}
      </AnimatePresence>

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center image-error-container">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Failed to load image</p>
            <button 
              onClick={() => {
                setError(false);
                setIsLoading(true);
                setImageSrc('');
                const img = new Image();
                img.src = src;
                img.onload = () => {
                  setImageSrc(src);
                  setIsLoading(false);
                };
                img.onerror = () => {
                  setError(true);
                  setIsLoading(false);
                };
              }}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {imageSrc && (
            <motion.img
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={imageSrc}
              alt={alt}
              className={`absolute inset-0 w-full h-full object-cover ${enableZoom ? 'optimized-image' : ''}`}
              style={{ opacity: isLoading ? 0 : 1 }}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
} 