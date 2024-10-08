// src/components/Loader.js
import React from 'react';

const Loader = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
        <style jsx>{`
      .loader {
        border: 16px solid #f3f3f3;
        border-top: 16px solid #3498db;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </div>
);

export default Loader;
