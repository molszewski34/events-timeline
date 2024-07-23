import React from 'react';

const ClientsList = ({ filteredReservations }) => {
  return (
    <table className="flex flex-col overflow-x-scroll">
      <thead className=" ">
        <tr className="text-sm text-left h-10 w-full border-b ">
          <th className="font-light text-center border-r min-w-14">#</th>
          <th className="font-extralight px-5 min-w-[250px]">Osoba</th>
          <th className="font-extralight px-5 min-w-[250px]">Telefon</th>
          <th className="font-extralight px-5 min-w-[250px]">Email</th>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        {filteredReservations.map((reservation, index) => (
          <tr className="font-light flex" key={reservation.id}>
            <td className="text-center font-light  border-r min-w-14 h-10">
              {index}
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
