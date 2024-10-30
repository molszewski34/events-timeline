'use client';
import React from 'react';

import { RoomRowsProps } from './types';
import PriceCells from './ui/PriceCells';

const Prices: React.FC<RoomRowsProps> = ({ rooms, prices }) => {
  return <PriceCells rooms={rooms} prices={prices} />;
};

export default Prices;
