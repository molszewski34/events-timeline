import React from 'react';
import { useSidebarContext } from '@/app/contexts/Sidebar/SidebarProvider';

const SidebarHeader = () => {
  const { openSidebar, setOpenSidebar } = useSidebarContext();

  return (
    <div className="flex items-center px-4 py-4 border border-gray-100  w-full">
      <button>
        <i className="text-xl p-2" onClick={() => setOpenSidebar(false)}>
          close
        </i>
      </button>
      <div className="flex text-2xl font-bold ">
        <p>Events</p>
        <p className="text-green-600">Timeline</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
