import { motion } from 'framer-motion';
import { heroImages } from '../../constants/images';

interface LoadingProps {
  progress: number;
}

const Loading = ({ progress }: LoadingProps) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src={heroImages.img_hill} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative w-full max-w-[800px] px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl font-bold mb-2"
        >
          Boyup Brook
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-4xl md:text-6xl font-bold mb-4"
        >
          Bridgetown
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-lg md:text-xl mb-12 max-w-[600px]"
        >
          301 acres freehold with 2km Blackwood River frontage. Perfect for eco-tourism, lifestyle development, and agricultural opportunities.
        </motion.div>

        <div className="w-full">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="h-[2px] bg-white rounded-full"
            transition={{ duration: 0.5 }}
          />
          <div className="flex justify-between items-center mt-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-xl font-bold"
            >
              {Math.round(progress)}%
            </motion.div>
            <motion.div
              className="text-white/80 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading...
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-[-100px] left-6 text-white/60 text-sm md:text-base"
        >
          Contact the owner for more information.
        </motion.div>
      </div>
    </div>
  );
};

export default Loading; 