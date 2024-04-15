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
