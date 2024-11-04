import { Reservation, Room } from '../../types';

export interface RoomRowsProps {
  rooms: Room[];
  reservations: Reservation[];
  startDate: Date;
  endDate: Date;
  currentDate: Date;
  isButtonVisible: boolean;
  handleButtonClick: (room: Room, timestamp: number) => void;
  handleMouseEnter: (room: Room, timestamp: number) => void;
  handleMouseLeave: () => void;
  hoveredColumnIndex: number | null;
  hoveredRowIndex: number | null;
  setHoveredColumnIndex: (index: number | null) => void;
  setHoveredRowIndex: (index: number | null) => void;
  MemoizedButton: React.MemoExoticComponent<React.FC>;
}
