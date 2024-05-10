export interface RoomType {
  roomType: string;
  roomTypeIcon: string;
}

export const roomTypes: RoomType[] = [
  {
    roomType: 'Pokój',
    roomTypeIcon: 'bed',
  },
  { roomType: 'Apartament', roomTypeIcon: 'apartment' },
  {
    roomType: 'Domek',
    roomTypeIcon: 'cottage',
  },
  { roomType: 'Studio', roomTypeIcon: 'weekend' },
  { roomType: 'Bungalow', roomTypeIcon: 'bungalow' },
  {
    roomType: 'Kamper',
    roomTypeIcon: 'local_shipping',
  },
  { roomType: 'Willa', roomTypeIcon: 'villa' },
  {
    roomType: 'Namiot',
    roomTypeIcon: 'festival',
  },
  {
    roomType: 'Domek letniskowy',
    roomTypeIcon: 'cabin',
  },
  {
    roomType: 'Łóżko',
    roomTypeIcon: 'single_bed',
  },
  {
    roomType: 'Łódź',
    roomTypeIcon: 'houseboat',
  },
  {
    roomType: 'Dom',
    roomTypeIcon: 'house',
  },
];
