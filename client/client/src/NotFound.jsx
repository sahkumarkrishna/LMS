
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen space-y-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image from Public Folder */}
      <img src="/images.png" alt="Page Not Found" className="w-96 h-72" />


      
      
          <Button className="mt-4" onClick={() => navigate("/")}>
            Go Home
          </Button>
    
     
    </motion.div>
  );
}
