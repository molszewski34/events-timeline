import React from 'react';
import useRows from '../useRows';
import { Room } from '@/app/data/types';

interface PriceCellsProps {
  rooms: Room[];
  prices: any;
}

const PriceCells: React.FC<PriceCellsProps> = ({ rooms, prices }) => {
  const { rows, hoveredColumnIndex } = useRows({ rooms, prices });

  return (
    <>
      {hoveredColumnIndex !== null && (
        <div
          className="absolute bg-black opacity-10 pointer-events-none"
          style={{
            width: '44px',
            height: `${(rooms.length + 1) * 44}px`,
            top: '37px',
            left: `${hoveredColumnIndex * 44}px`,
            zIndex: 10,
          }}
        />
      )}
      <>{rows}</>
    </>
  );
};

export default PriceCells;
