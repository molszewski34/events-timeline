import { useState } from 'react';

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <header className="flex justify-between bg-gray-100 p-2">
        <p className="text-sm">Podgląd</p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center material-icon text-2xl bg-gray-300 w-5 h-5 rounded-sm"
        >
          {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </button>
      </header>
      {isOpen && <p>Dupa</p>}
    </div>
  );
};

export default Preview;
