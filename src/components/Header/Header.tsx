import React from "react";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { filters, Filter } from "../../App";
import { useDarkMode } from "../../context/DarkModeContext";

import styles from "./Header.module.css";

interface Props {
  filter: Filter;
  onFilterChange(filter: Filter): void;
}

const Header: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <header className={styles.header}>
      {/* Icon */}
      {darkMode ? (
        <BsFillMoonFill onClick={toggleDarkMode} className={styles.themeIcon} />
      ) : (
        <BsSunFill onClick={toggleDarkMode} className={styles.themeIcon} />
      )}
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
