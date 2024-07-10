'use client';

import { createContext, useContext, useState } from 'react';

export const Sidebar = createContext<any>(undefined);

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Sidebar.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </Sidebar.Provider>
  );
}

export function useSidebarContext() {
  return useContext(Sidebar);
}
