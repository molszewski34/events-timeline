import React from 'react';

interface ReservationDetailProps {
  label: string;
  value: string;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({
  label,
  value,
}) => (
  <div className="flex gap-2 text-xs">
    <span className="text-gray-500 font-semibold">{label}</span>
    <p className="font-semibold">{value}</p>
  </div>
);

export default ReservationDetail;
