import React from 'react';

const Watermark: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-100">
      <div className="backdrop-blur-lg bg-black/10 border-2 border-gray-300/50 shadow-2xl rounded-full px-6 py-3 hover:bg-black/20 transition-all duration-300">
        <p className="text-sm font-semibold clash text-gray-900">
          Designed by <span className=" bg-clip-text text-black  animate-pulse">zidduhh</span>
        </p>
      </div>
    </div>
  );
};

export default Watermark;
