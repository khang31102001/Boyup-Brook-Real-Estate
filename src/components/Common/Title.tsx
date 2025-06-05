import { motion } from 'framer-motion';

interface TitleProps {
  mainTitle: string;
  subtitle?: string;
  className?: string;
}

export default function Title({ mainTitle, subtitle, className = '' }: TitleProps) {
  return (
    <motion.div 
      className={`text-center my-8 bg-white ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        {mainTitle}
      </h1>
      {subtitle && (
        <p className="text-sm lg:text-lg xl:text-xl max-w-2xl mx-auto tracking-wide text-emerald-900">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 