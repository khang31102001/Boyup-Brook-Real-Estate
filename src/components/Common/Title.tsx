import { motion } from 'framer-motion';

interface TitleProps {
  mainTitle: string;
  subtitle?: string;
  className?: string;
}

export default function Title({ mainTitle, subtitle, className = '' }: TitleProps) {
  return (
    <motion.div 
      className={`text-center my-16 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold  mb-4">
        {mainTitle}
      </h1>
      {subtitle && (
        <p className=" text-lg sm:text-xl max-w-2xl mx-auto tracking-wide">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 