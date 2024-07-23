import React from 'react';

const ClientsList = ({ filteredReservations }) => {
  // const filteredData = data.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       item.phone.includes(searchQuery)
  //   );

  return (
    <table>
      <thead>
        <tr className="border-b ">
          <th>#</th>
          <th>Osoba</th>
          <th>Telefon</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {filteredReservations.map((reservation, index) => (
          <tr key={reservation.id}>
            <td>{index}</td>
            <td>{reservation.main_guest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsList;
