import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ value, onChange, onSubmit, placeholder }) {
	return (
		<form
			className={styles.searchForm}
			onSubmit={(e) => {
				e.preventDefault();
				if (onSubmit) onSubmit();
			}}
		>
			<input
				type="text"
				className={styles.searchInput}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={placeholder || "Search all news..."}
			/>
			<button type="submit" className={styles.searchButton}>
				Search
			</button>
		</form>
	);
}

export default SearchBar;
