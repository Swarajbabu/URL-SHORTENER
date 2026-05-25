import React from 'react';
import { motion } from 'framer-motion';
import UrlForm from '../components/UrlForm';
import { Zap, BarChart3, ShieldCheck } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center mb-10 space-y-6"
      >
        <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs font-bold tracking-widest uppercase shadow-sm border border-primary/20 backdrop-blur-md">
          ✨ The Future of Link Management
        </span>
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[1.1]">
          Make every link <br className="hidden md:block"/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x">
            work harder
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 font-medium">
          Transform ugly, long URLs into memorable, trackable short links. 
          Boost your click-through rates and analyze your audience in real-time.
        </p>
      </motion.div>
      
      <UrlForm />
      
      {/* Decorative Features Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-4"
      >
        {[
          { icon: <Zap size={28} className="text-primary" />, title: 'Lightning Fast', desc: 'Global edge network ensures your links redirect instantly anywhere in the world.' },
          { icon: <BarChart3 size={28} className="text-secondary" />, title: 'Deep Analytics', desc: 'Track clicks, geographic data, and referrers to understand your audience.' },
          { icon: <ShieldCheck size={28} className="text-green-500" />, title: 'Bank-grade Security', desc: 'Automatic malware scanning and HTTPS encryption for every single link.' }
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass glow-border p-8 rounded-3xl"
          >
            <div className="bg-white/50 dark:bg-black/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/20 dark:border-white/5">
              {feature.icon}
            </div>
            <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
