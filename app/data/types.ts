export interface Room {
  name: string;
  events: Event[];
}
interface Event {
  title: string;
  start: string;
  end: string;
}
