import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { TfiFilter } from "react-icons/tfi";
import "./style.scss";

interface FilterProps {
  filterOptions: string[];
  onSelectFilter?: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filterOptions, onSelectFilter }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  const handleFilter = (filter: string): void => {
    setSelected(filter);
    if (onSelectFilter) onSelectFilter(filter);
    setShowOptions(false);
  };

  return (
    <div className="filter-wrapper">
      <button
        className={`${showOptions ? "open" : ""}`}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        {selected ? <FaFilter /> : <TfiFilter />}
      </button>
      {showOptions && (
        <div className="filter-popover">
          <div onClick={() => handleFilter("")} className={`filter-item`}>
            All Teams
          </div>
          {filterOptions?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFilter(item)}
              className={`filter-item ${selected === item ? "selected" : ""}`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
