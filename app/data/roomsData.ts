import { Room } from './types';

export const rooms: Room[] = [
  {
    id: '1',
    roomName: 'Pokój 1',
    roomGuests: 2,
    roomType: 'Pokój',
    roomTypeIcon: 'bed',
    events: [
      {
        title: 'Spotkanie',
        start: '2024-03-01T10:00:00',
        end: '2024-03-02T12:00:00',
      },
      {
        title: 'Prezentacja',
        start: '2024-03-03T14:00:00',
        end: '2024-03-04T16:00:00',
      },
      {
        title: 'Szkolenie',
        start: '2024-03-06T09:00:00',
        end: '2024-03-15T17:00:00',
      },
    ],
  },
  {
    id: '2',
    roomName: 'Pokój 2',
    roomGuests: 7,
    roomType: 'Apartament',
    roomTypeIcon: 'apartment',
    events: [
      {
        title: 'Wywiad',
        start: '2024-03-02T13:00:00',
        end: '2024-03-03T15:00:00',
      },
      {
        title: 'Konferencja',
        start: '2024-03-05T10:00:00',
        end: '2024-03-07T16:00:00',
      },
    ],
  },
  {
    id: '3',
    roomName: 'Pokój 3',
    roomGuests: 2,
    roomType: 'Namiot',
    roomTypeIcon: 'apartment',
    events: [
      {
        title: 'Spotkanie z klientem',
        start: '2024-03-06T11:00:00',
        end: '2024-03-08T13:00:00',
      },
      {
        title: 'Warsztaty',
        start: '2024-03-10T09:00:00',
        end: '2024-03-12T17:00:00',
      },
    ],
  },
  {
    id: '4',
    roomName: 'Pokój 4',
    roomGuests: 6,
    roomType: 'Studio',
    roomTypeIcon: 'weekend',

    events: [
      {
        title: 'Spotkanie',
        start: '2024-03-01T10:00:00',
        end: '2024-03-02T12:00:00',
      },
      {
        title: 'Prezentacja',
        start: '2024-03-03T14:00:00',
        end: '2024-03-04T16:00:00',
      },
      {
        title: 'Szkolenie',
        start: '2024-03-06T09:00:00',
        end: '2024-03-15T17:00:00',
      },
    ],
  },
  {
    id: '5',
    roomName: 'Pokój 5',
    roomGuests: 3,
    roomType: 'Kamper',
    roomTypeIcon: 'local_shipping',

    events: [
      {
        title: 'Spotkanie',
        start: '2024-03-01T10:00:00',
        end: '2024-03-02T12:00:00',
      },
      {
        title: 'Prezentacja',
        start: '2024-03-03T14:00:00',
        end: '2024-03-04T16:00:00',
      },
      {
        title: 'Szkolenie',
        start: '2024-03-06T09:00:00',
        end: '2024-03-15T17:00:00',
      },
    ],
  },
  {
    id: '6',
    roomName: 'Pokój 6',
    roomGuests: 10,
    roomType: 'Willa',
    roomTypeIcon: 'local_shipping',
    events: [
      {
        title: 'Spotkanie',
        start: '2024-03-01T10:00:00',
        end: '2024-03-02T12:00:00',
      },
      {
        title: 'Prezentacja',
        start: '2024-03-03T14:00:00',
        end: '2024-03-04T16:00:00',
      },
      {
        title: 'Szkolenie',
        start: '2024-03-06T09:00:00',
        end: '2024-03-15T17:00:00',
      },
    ],
  },
  {
    id: '7',
    roomName: 'Pokój 7',
    roomGuests: 5,
    roomType: 'Domek',
    roomTypeIcon: 'cottage',
    events: [
      {
        title: 'Spotkanie',
        start: '2024-03-01T10:00:00',
        end: '2024-03-02T12:00:00',
      },
      {
        title: 'Prezentacja',
        start: '2024-03-03T14:00:00',
        end: '2024-03-04T16:00:00',
      },
      {
        title: 'Szkolenie',
        start: '2024-03-06T09:00:00',
        end: '2024-03-15T17:00:00',
      },
    ],
  },
];
