import React from "react";
import { BsSunFill } from "react-icons/bs";
import { filters, Filter } from "../../App";

import styles from "./Header.module.css";

interface Props {
  filter: Filter;
  onFilterChange(filter: Filter): void;
}

const Header: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <div className={styles.header}>
      {/* Icon */}
      <BsSunFill className={styles.themeIcon} />
      {/* Filter */}
      <ul className={styles.filter}>
        {filters.map((f) => (
          <li>
            <button
              onClick={() => onFilterChange(f)}
              className={`${styles.filterItem} ${
                filter === f && styles.selectedFilterItem
              }`}
            >
              {`${f[0].toUpperCase()}${f.slice(1)}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
