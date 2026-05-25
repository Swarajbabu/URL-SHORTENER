import React from 'react';
import UrlTable from '../components/UrlTable';

const Dashboard = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Your Link Dashboard
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          View all your shortened links, monitor click engagement, and manage your history in one convenient place.
        </p>
      </div>
      
      <UrlTable />
    </div>
  );
};

export default Dashboard;
