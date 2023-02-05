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
    <header className={styles.header}>
      {/* Icon */}
      <BsSunFill className={styles.themeIcon} />
      {/* Filter */}
      <ul className={styles.filters}>
        {filters.map((f, i) => (
          <li key={i}>
            <button
              onClick={() => onFilterChange(f)}
              className={`${styles.filter} ${filter === f && styles.selected}`}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
