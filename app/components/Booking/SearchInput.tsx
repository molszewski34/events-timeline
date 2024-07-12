import React from 'react';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
}) => (
  <label
    className="flex border border-gray-300 rounded-md py-1 px-2 w-3/4"
    htmlFor="search"
  >
    <i className="text-lg">search</i>
    <input
      className="w-full"
      type="text"
      id="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </label>
);

export default SearchInput;
