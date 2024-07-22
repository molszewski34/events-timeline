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
    className="flex border border-gray-300 rounded-md pl-[8.5px] py-[2px] px-2 w-3/4"
    htmlFor="search"
  >
    <i className="text-xl text-gray-400">search</i>
    <input
      className="w-full text-xs"
      type="text"
      id="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    {searchQuery.length > 0 && (
      <button className="w-[28px]">
        <i onClick={() => setSearchQuery('')}>close</i>
      </button>
    )}
  </label>
);

export default SearchInput;
