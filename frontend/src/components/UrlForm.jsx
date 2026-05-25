import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const shortDomain = import.meta.env.VITE_SHORT_DOMAIN || 'http://localhost:5000';
      
      const res = await axios.post(`${apiUrl}/api/url/shorten`, { originalUrl: url });
      setShortUrl(`${shortDomain}/${res.data.shortId}`);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto mt-4 relative z-20"
    >
      <div className="glass glow-border p-2 md:p-3 rounded-[2.5rem] shadow-2xl shadow-primary/20">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-6 text-slate-400 z-10 pointer-events-none">
            <Link2 size={24} className={url ? 'text-primary transition-colors' : 'transition-colors'} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
            className="w-full bg-white/70 dark:bg-black/40 border-0 rounded-full py-5 md:py-6 pl-16 pr-40 text-lg focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all font-medium placeholder:text-slate-400"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !url}
            className="absolute right-3 top-3 bottom-3 bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-bold rounded-full px-6 md:px-8 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-primary/30"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : (
              <>
                <span className="hidden md:inline">Shorten</span>
                <ArrowRight size={20} className="md:hidden" />
              </>
            )}
          </motion.button>
        </form>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-2 text-red-500 bg-red-500/10 backdrop-blur-md px-6 py-3 rounded-full border border-red-500/20 w-max mx-auto shadow-lg"
          >
            <AlertCircle size={18} />
            <span className="text-sm font-bold">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shortUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 glass p-6 rounded-3xl border border-primary/30 shadow-xl shadow-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            {/* Glossy overlay effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            
            <div className="flex flex-col w-full truncate relative z-10">
              <span className="text-xs text-primary uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Link Ready!
              </span>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-foreground hover:text-primary transition-colors truncate">
                {shortUrl}
              </a>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`relative z-10 flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-bold transition-all whitespace-nowrap shadow-md ${
                copied ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={20} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={20} /> Copy Link
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UrlForm;
