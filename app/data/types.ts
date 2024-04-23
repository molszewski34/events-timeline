export interface Room {
  id: string;
  roomName: string;
  roomGuests: number;
  roomType: string;
  roomPrice: number;
  roomTypeIcon: string;
  events: Event[];
}

interface Event {
  title: string;
  start: string;
  end: string;
}

export interface Country {
  name_pl: string;
  name_en: string;
  code: string;
}
