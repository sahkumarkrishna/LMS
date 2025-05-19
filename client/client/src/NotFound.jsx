
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import PageNotFound from "../src/assets/pageNotFound.png";

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center  text-center p-6"
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // End state
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      <motion.h1
        className="text-6xl font-bold text-red-600 mb-4 mt-20"
        initial={{ y: -50 }} // Initial state
        animate={{ y: 0 }} // End state
        transition={{ duration: 0.5, ease: "easeOut" }} // Duration and easing
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops! You hit a dead end.
      </motion.p>

      <motion.img
        src={PageNotFound}
        alt="Funny 404"
        className="w-72 my-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <motion.p
        className="text-gray-600 dark:text-gray-400 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        The page you're looking for doesn't exist... maybe it moved?
      </motion.p>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/"
          className="text-white bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded-lg transition"
          whileHover={{ scale: 1.1 }} // Add a hover effect
          whileTap={{ scale: 0.95 }} // Add a tap effect
        >
          Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
