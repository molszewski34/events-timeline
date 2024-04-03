export interface Room {
  id: string;
  roomName: string;
  roomGuests: number;
  roomType: string;
  roomTypeIcon: string;
  events: Event[];
}
interface Event {
  title: string;
  start: string;
  end: string;
}
