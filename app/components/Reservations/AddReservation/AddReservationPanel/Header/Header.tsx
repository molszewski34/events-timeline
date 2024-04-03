'use client';
import React from 'react';
import { Button } from '@/app/components/ui/button';

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center">
        <h1 className="font-bold">Dodaj rezerwacje</h1>
        <Button
          className="material-icon text-red-600 text-2xl"
          variant={'ghost'}
        >
          close
        </Button>
      </div>
      <Button
        size={'sm'}
        className="flex gap-1 bg-green-500 text-white text-xs"
        variant="outline"
      >
        <span className="material-icon">save</span>
        Zapisz
      </Button>
    </header>
  );
};

export default Header;
