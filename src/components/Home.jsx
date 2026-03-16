import React, { useState } from "react";
import SearchBar from "./SearchBar";
import News from "./News";

function Home() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<SearchBar
				value={searchQuery}
				onChange={setSearchQuery}
				onSubmit={() => {}}
				placeholder="Search all news..."
			/>

			<News key={searchQuery || "top"} category="top" searchQuery={searchQuery} />
		</>
	);
}

export default Home;
