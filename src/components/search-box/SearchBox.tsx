import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import "./style.scss";

interface SearchBoxProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch: (value: string) => void;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search",
  onChange,
  onSearch,
  className = "",
}) => {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (onChange) onChange(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (onSearch) onSearch(search);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) onSearch(search);
  };

  const handleSearchClear = () => {
    setSearch("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`search-box ${className}`}>
      <button onClick={handleSearchClick}>
        <CiSearch />
      </button>
      <input
        type="search"
        name="focus"
        placeholder={placeholder}
        id="search-input"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      {search?.length > 0 && (
        <button onClick={handleSearchClear}>
          <MdClear />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
