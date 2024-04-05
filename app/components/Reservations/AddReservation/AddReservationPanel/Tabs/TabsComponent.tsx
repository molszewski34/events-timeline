import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import Reservation from './Reservation/Reservation';
import Client from './Client/Client';

const TabsComponent = () => {
  return (
    <Tabs defaultValue="reservation" className="w-[400px]">
      <TabsList className="bg-white">
        <TabsTrigger className="flex items-center gap-1 " value="reservation">
          <span className="material-icon text-lg text-gray-400">event</span>
          Rezerwacja
        </TabsTrigger>
        <TabsTrigger value="client">
          <span className="material-icon text-lg text-gray-400">person</span>
          Klient
        </TabsTrigger>
        <TabsTrigger value="details">
          <span className="material-icon text-lg text-gray-400">summarize</span>
          Szczegóły
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reservation">
        <Reservation />
      </TabsContent>
      <TabsContent value="client">
        <Client />
      </TabsContent>
      <TabsContent value="details">Details</TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
