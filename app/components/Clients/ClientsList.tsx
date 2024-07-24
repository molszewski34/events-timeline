import React, { useMemo } from 'react';
import { Reservation } from '../RenderRows/types';
interface ClientsListProps {
  filteredReservations: Reservation[];
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
}

const ClientsList: React.FC<ClientsListProps> = ({
  filteredReservations,
  isAscending,
  setIsAscending,
}) => {
  // Sorting function
  const sortedReservations = useMemo(() => {
    return filteredReservations.sort((a, b) => {
      if (a.main_guest < b.main_guest) {
        return isAscending ? -1 : 1;
      }
      if (a.main_guest > b.main_guest) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
  }, [filteredReservations, isAscending]);

  return (
    <table className="flex flex-col overflow-x-scroll">
      <thead>
        <tr className="text-sm text-left h-10 w-full border-b">
          <th className="font-light text-center border-r min-w-14">#</th>
          <th className="flex gap-1 items-center font-extralight px-5 min-w-[250px] h-10">
            <p>Osoba</p>
            <span
              className="flex flex-col text-xl h-10 cursor-pointer"
              onClick={() => setIsAscending(!isAscending)}
            >
              <button
                className="material-icon h-5 text-gray-300"
                style={isAscending ? { color: 'black' } : { color: '' }}
              >
                arrow_drop_up
              </button>
              <button
                className="material-icon h-5 pt-1 flex items-end text-gray-300"
                style={!isAscending ? { color: 'black' } : { color: '' }}
              >
                arrow_drop_down
              </button>
            </span>
          </th>
          <th className="font-extralight px-5 min-w-[250px]">Telefon</th>
          <th className="font-extralight px-5 min-w-[250px]">Email</th>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        {sortedReservations.map((reservation, index) => (
          <tr className="font-light flex" key={reservation.id}>
            <td className="text-center font-light border-r min-w-14 h-10">
              {index + 1}
            </td>
            <td className="text-center flex px-5 flex-nowrap min-w-[250px] h-10">
              {reservation.main_guest}
            </td>
            <td className="px-5 min-w-[250px] h-10">{reservation.phone}</td>
            <td className="px-5 min-w-[250px] h-10">{reservation.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsList;
