import { rooms } from '@/app/data/roomsData';
import { Room } from '@/app/data/types';
import { useAddReservationContext } from '@/app/contexts/AddReservation/AddReservationProvider';
const SelectObject = () => {
  const { selectedRoom, setSelectedroom, roomListOpen, setRoomListOpen } =
    useAddReservationContext();

  const handleSelectOption = (room: Room) => {
    setSelectedroom(room);
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex items-center gap-2 bg-gray-100 p-2 rounded-sm"
        onClick={() => setRoomListOpen(!roomListOpen)}
      >
        <div
          className={`w-8 h-8 rounded-full flex justify-center items-center`}
        >
          <span className="material-icon text-green-500">
            {selectedRoom?.roomTypeIcon}
          </span>
        </div>

        {selectedRoom?.roomName}
      </button>

      {rooms.map((room, index) => (
        <div className={`${roomListOpen ? '' : 'h-0 overflow-hidden'}`}>
          {selectedRoom?.roomName != room.roomName && (
            <div className="flex bg-white hover:bg-slate-200">
              <button
                className="flex items-center gap-2  p-2 rounded-sm w-full"
                key={index}
                onClick={() => {
                  handleSelectOption(room);
                  setRoomListOpen(false);
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex justify-center items-center`}
                >
                  <span className="material-icon text-green-500">
                    {room.roomTypeIcon}
                  </span>
                </div>
                {room.roomName}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectObject;
