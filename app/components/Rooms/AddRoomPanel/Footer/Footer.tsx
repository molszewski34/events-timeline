import React from 'react';
import AddRoomSubmitBtn from '../AddRoomSubmitBtn/AddRoomSubmitBtn';

const Footer = () => {
  return (
    <div className="flex items-center">
      <button className="flex gap-1 bg-gray-200 hover:bg-gray-300 text-black w-full items-center justify-center py-1 rounded-sm">
        Zamknij
      </button>
      <AddRoomSubmitBtn />
    </div>
  );
};

export default Footer;
