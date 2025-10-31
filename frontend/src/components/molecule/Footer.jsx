import { motion } from "framer-motion";
import { FaTwitter, FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black via-[#0b0b0b] to-transparent text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Logo + Solana */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <img 
            src="/solana.jpg" 
            alt="Solana" 
            className="h-8 w-auto"
          />
          <h1 className="text-lg font-semibold bg-gradient-to-r from-[#d2d2d2] via-[#b3b3b3] to-blue-500 bg-clip-text text-transparent">
            Powered by Solana
          </h1>
        </motion.div>

        {/* Center: Navigation */}
        {/* <motion.ul 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 text-sm"
        >
          <li className="hover:text-white transition-colors cursor-pointer">Home</li>
          <li className="hover:text-white transition-colors cursor-pointer">Features</li>
          <li className="hover:text-white transition-colors cursor-pointer">Docs</li>
          <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
        </motion.ul> */}

        {/* Right: Social Icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-5 text-xl"
        >
          <a href="#" className="hover:text-blue-600 transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-blue-600 transition"><FaDiscord /></a>
          <a href="#" className="hover:text-blue-600 transition"><FaGithub /></a>
        </motion.div>
              <div className=" py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Sandbox Labs. Built for the Solana Cypherpunk Hackathon ⚡
      </div>
      </div>

      {/* Bottom Line */}

    </footer>
  );
};

export default Footer;
