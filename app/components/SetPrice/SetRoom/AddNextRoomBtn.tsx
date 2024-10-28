import React from 'react';

interface AddNextRoomBtnProps {
  setIsNextRoomVisible: (visible: boolean) => void;
}

const AddNextRoomBtn: React.FC<AddNextRoomBtnProps> = ({
  setIsNextRoomVisible,
}) => {
  return (
    <div className="flex flex-col">
      <span
        onClick={() => setIsNextRoomVisible(true)}
        className="flex items-center gap-1 text-[#00a541] text-sm font-medium cursor-pointer border-b-2 border-gray-200"
      >
        <i className="text-xl">add</i>
        <p className="text-xs">Dodaj kolejny pokój</p>
      </span>
    </div>
  );
};

export default AddNextRoomBtn;
