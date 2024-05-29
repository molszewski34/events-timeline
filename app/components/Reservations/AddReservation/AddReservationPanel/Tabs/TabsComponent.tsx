import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import Reservation from './Reservation/Reservation';
import Client from './Client/Client';
import Details from './Details/Details';

const TabsComponent = () => {
  return (
    <Tabs defaultValue="reservation" className="w-full">
      <TabsList className="bg-white w-full flex ">
        <TabsTrigger
          className="flex items-center gap-1 w-full"
          value="reservation"
        >
          <span className="material-icon text-lg text-gray-400">event</span>
          <p className="hidden w-full">Rezerwacja</p>
        </TabsTrigger>
        <TabsTrigger className="flex items-center gap-1 w-full" value="client">
          <span className="material-icon text-lg text-gray-400">person</span>
          <p className="hidden w-full">Klient</p>
        </TabsTrigger>
        <TabsTrigger className="flex items-center gap-1 w-full" value="details">
          <span className="material-icon text-lg text-gray-400">summarize</span>
          <p className="hidden w-full">Szczegóły</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reservation">
        <Reservation />
      </TabsContent>
      <TabsContent value="client">
        <Client />
      </TabsContent>
      <TabsContent value="details">
        <Details />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
