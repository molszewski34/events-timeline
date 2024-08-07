import React from 'react';

interface TabSelectorProps {
  activeTab: 'Najnowsze' | 'Anulowane';
  handleTabClick: (tab: 'Najnowsze' | 'Anulowane') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  handleTabClick,
}) => (
  <div className="flex justify-center">
    <button
      onClick={() => handleTabClick('Najnowsze')}
      className={`py-2 pt-4 w-full text-sm ${
        activeTab === 'Najnowsze'
          ? 'text-green-600 border-b-2 border-green-600'
          : 'text-black'
      }`}
    >
      Najnowsze
    </button>
    <button
      onClick={() => handleTabClick('Anulowane')}
      className={`py-2 px-4 w-full text-sm ${
        activeTab === 'Anulowane'
          ? 'text-green-600 border-b-2 border-green-600'
          : 'text-black'
      }`}
    >
      Anulowane
    </button>
  </div>
);

export default TabSelector;
