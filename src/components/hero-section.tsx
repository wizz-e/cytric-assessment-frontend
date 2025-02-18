import { motion } from "motion/react";
import { CirclePlay, Rocket } from "lucide-react";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6 py-16"
    >
      <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-white">
        Discover & Collect
        <br />
        Extraordinary NFTs
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Enter the world of digital art and collectibles. Explore unique NFTs
        created by artists worldwide.
      </p>
      <div className="flex gap-4 justify-center">
        <button className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-600 inline-flex items-center gap-2 hover:bg-purple-700  text-white rounded-lg transition-colors duration-200 font-medium">
          <Rocket className="w-4 h-4" />
          Start Creating
        </button>
        <button className="px-6 py-3 border border-gray-700 hover:border-purple-500 text-white rounded-lg transition-colors duration-200 font-medium inline-flex items-center gap-2">
          <CirclePlay className="w-4 h-4" />
          Watch Demo
        </button>
      </div>
    </motion.section>
  );
}
