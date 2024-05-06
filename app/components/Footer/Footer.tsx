import { useState } from 'react';

const Footer = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <footer className="fixed bottom-0 flex justify-end w-full">
      {isClicked ? (
        <button
          className="material-icon rounded-full py-3 px-4 bg-white flex shadow-lg mr-4 mb-2 text-xl text-green-600"
          onClick={() => setIsClicked(!isClicked)}
        >
          more_vert
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            className="material-icon rounded-full py-2 px-3 bg-gray-700 flex shadow-lg mr-4 mb-2 text-2xl text-white relative "
            onClick={() => setIsClicked(!isClicked)}
          >
            close
          </button>
          <div className="flex flex-col absolute top-[-12em] right-2 w-[170px] bg-white text-black shadow-sm rounded-sm gap-2 py-1">
            <button className="flex gap-2 bg-white px-1 py-3 text-green-500 hover:bg-gray-100">
              <i className="material-icon">add_box</i>
              <p className="">Dodaj rezerwacje</p>
            </button>
            <button className="flex gap-2 bg-white px-1 py-3 hover:bg-gray-100">
              <i className="material-icon">house</i>
              <p className="">Dodaj pokój</p>
            </button>
            <div className="py-1 w-full border-t-2 border-gray-200">
              <button className="flex gap-2 bg-white px-1 py-3 hover:bg-gray-100 w-full">
                <i className="material-icon text-lg">toggle_off</i>
                <p className="">Podsumowanie</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
