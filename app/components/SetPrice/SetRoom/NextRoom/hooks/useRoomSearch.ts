import React from 'react';

interface Room {
  name: string;
}

export function useRoomSearch(rooms: Room[] | null | undefined) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const filteredRooms =
    rooms?.filter((room) =>
      room.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return { searchTerm, setSearchTerm, filteredRooms };
}
