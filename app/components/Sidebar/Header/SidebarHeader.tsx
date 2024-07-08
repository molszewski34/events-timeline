import React from 'react';

const SidebarHeader = () => {
  return (
    <div className="flex items-center px-4 py-4 w-60 border border-gray-100 gap-2">
      <i className="text-xl">close</i>
      <div className="flex text-2xl font-bold">
        <p>Events</p>
        <p className="text-green-600">Timeline</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
