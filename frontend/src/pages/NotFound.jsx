import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="bg-red-500/10 text-red-500 p-6 rounded-full mb-6 border border-red-500/20">
        <AlertTriangle size={64} />
      </div>
      <h1 className="text-6xl font-black mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8">
        Oops! The page or link you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link 
        to="/" 
        className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-lg shadow-primary/20"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
