import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trash2, ExternalLink, Loader2, MousePointerClick } from 'lucide-react';

const UrlTable = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const shortDomain = import.meta.env.VITE_SHORT_DOMAIN || 'http://localhost:5000';

  const fetchUrls = async () => {
    try {
      const res = await axios.get('/api/url/history');
      setUrls(res.data);
    } catch (err) {
      console.error('Error fetching URLs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/url/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (err) {
      console.error('Error deleting URL', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto mt-8"
    >
      <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 border border-white/20 dark:border-white/5 bg-white/40 dark:bg-black/40">
        <div className="p-8 border-b border-white/20 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black mb-1">Link Activity</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Monitor your short link performance in real-time.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full border border-white/20 dark:border-white/5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold">{urls.length} Active Links</span>
          </div>
        </div>
        
        {urls.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <MousePointerClick size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">No links created yet</h3>
            <p className="text-slate-500">Go back home and create your first short link!</p>
          </div>
        ) : (
          <div className="overflow-x-auto p-4 md:p-8">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-4 font-black tracking-wider">Original URL</th>
                  <th scope="col" className="px-6 py-4 font-black tracking-wider">Short URL</th>
                  <th scope="col" className="px-6 py-4 font-black tracking-wider text-center">Clicks</th>
                  <th scope="col" className="px-6 py-4 font-black tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-4 font-black tracking-wider text-right">Manage</th>
                </tr>
              </thead>
              <motion.tbody
                variants={tableVariants}
                initial="hidden"
                animate="show"
              >
                {urls.map((url) => (
                  <motion.tr 
                    variants={rowVariants}
                    key={url._id} 
                    className="group border-b border-slate-200/50 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/5 transition-colors rounded-2xl"
                  >
                    <td className="px-6 py-5 max-w-[200px] truncate font-medium text-slate-600 dark:text-slate-300" title={url.originalUrl}>
                      {url.originalUrl}
                    </td>
                    <td className="px-6 py-5">
                      <a 
                        href={`${shortDomain}/${url.shortId}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-secondary transition-colors"
                      >
                        {url.shortId} <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="bg-gradient-to-tr from-primary/10 to-secondary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-black shadow-sm">
                        {url.clicks}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-slate-500 font-medium">
                      {new Date(url.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(url._id)}
                        className="text-slate-400 hover:text-red-500 bg-white/50 dark:bg-black/50 hover:bg-red-50 dark:hover:bg-red-500/10 p-2.5 rounded-xl transition-colors shadow-sm"
                        title="Delete URL"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UrlTable;
