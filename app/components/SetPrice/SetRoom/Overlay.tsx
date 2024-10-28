import React from 'react';

interface OverlayProps {
  isNextRoomVisible: boolean;
  setIsNextRoomVisible: (visible: boolean) => void;
}

const Overlay: React.FC<OverlayProps> = ({
  isNextRoomVisible,
  setIsNextRoomVisible,
}) => {
  const handleOverlayClick = () => {
    setIsNextRoomVisible(false);
  };
  return (
    <div>
      {isNextRoomVisible && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0  z-0"
          onClick={handleOverlayClick}
        />
      )}
    </div>
  );
};

export default Overlay;
