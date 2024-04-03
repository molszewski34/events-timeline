export interface Room {
  roomName: string;
  id: string;
  // events: { start: string; end: string; title: string }[];
  events: Event[];
}

export interface Event {
  start: string;
  end: string;
  title: string;
}

export interface Day {
  date: Date;
  startDate: Date;
  isToday: boolean;
  isSelected: boolean;
  isEventStartDate: boolean;
  eventOverlaySize: string;
  eventTitle: string;
  onMouseEnter: () => void;
}
