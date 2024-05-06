import React from 'react';
import { Button } from '@/app/components/ui/button';
const Footer = () => {
  return (
    <div className="flex items-center">
      <Button
        size={'sm'}
        className="flex gap-1 bg-gray-200 text-black w-full"
        variant="outline"
      >
        Zamknij
      </Button>
      <Button
        size={'sm'}
        className="flex gap-1 bg-green-500 text-white w-full"
        variant="outline"
      >
        <span className="material-icon">save</span>
        Zapisz
      </Button>
    </div>
  );
};

export default Footer;
