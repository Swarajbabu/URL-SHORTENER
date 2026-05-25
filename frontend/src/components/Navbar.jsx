import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ toggleTheme, darkMode }) => {
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 px-4 py-4 mb-4 border-b-0 border-x-0"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight group">
          <div className="bg-gradient-to-tr from-primary to-secondary text-white p-2 rounded-xl shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
            <LinkIcon size={22} className="group-hover:rotate-12 transition-transform" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-black text-2xl">
            QuickLink
          </span>
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="flex gap-6 hidden sm:flex">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-primary' : 'hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-semibold transition-colors ${location.pathname === '/dashboard' ? 'text-primary' : 'hover:text-primary'}`}
            >
              Dashboard
            </Link>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-white/50 dark:bg-black/50 border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400 drop-shadow-md" /> : <Moon size={18} className="text-slate-800" />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
