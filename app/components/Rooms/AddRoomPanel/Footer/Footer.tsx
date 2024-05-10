import React from 'react';

const Footer = () => {
  return (
    <div className="flex items-center">
      <button className="flex gap-1 bg-gray-200 hover:bg-gray-300 text-black w-full items-center justify-center py-1 rounded-sm">
        Zamknij
      </button>
      <button className="flex gap-1 bg-green-600 hover:bg-green-700 text-white w-full items-center justify-center py-1 rounded-sm">
        <span className="material-icon">save</span>
        Zapisz
      </button>
    </div>
  );
};

export default Footer;
