import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => (
  <input
    type="text"
    className="w-full h-[23px] p-1"
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
  />
);

export default SearchBar;
