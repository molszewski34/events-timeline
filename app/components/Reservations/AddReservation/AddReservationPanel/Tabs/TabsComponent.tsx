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
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger data-state="active" value="reservation">
          Rezerwacja
        </TabsTrigger>
        <TabsTrigger value="client">Klient</TabsTrigger>
        <TabsTrigger value="details">Szczegóły</TabsTrigger>
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
