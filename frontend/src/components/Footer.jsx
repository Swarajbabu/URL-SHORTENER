import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center text-sm text-slate-500 dark:text-slate-400 glass border-t-0">
      <p>&copy; {new Date().getFullYear()} QuickLink. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
