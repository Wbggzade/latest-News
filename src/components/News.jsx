

import React, { useState, useEffect } from "react";
import NewsItem from "./News_items";
import InfiniteScroll
	from "react-infinite-scroll-component";
import styles from "./news.module.css";

function News(props) {
	const { category, searchQuery } = props;
	const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
	let [articles, setArticles] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [nextPage, setNextPage] = useState('');

	useEffect(() => {
		if (!apiKey) {
			console.error(
				"Missing VITE_NEWSDATA_API_KEY. Create a .env file with VITE_NEWSDATA_API_KEY=your_key."
			);
			return;
		}

		const resultNews = async () => {
			try {
				let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in`;
				if (searchQuery && searchQuery.trim() !== "") {
					url += `&q=${encodeURIComponent(searchQuery.trim())}`;
				} else {
					url += `&category=${category}`;
				}
				let data = await fetch(url);
				let parsedData = await data.json();
				if (parsedData.status === 'success') {
					setArticles(parsedData.results || []);
					setTotalResults(parsedData.totalResults || 0);
					setNextPage(parsedData.nextPage || '');
				} else {
					console.error('API Error:', parsedData.message);
				}
			} catch (error) {
				console.error('Fetch error:', error);
			}
		};
		resultNews();
	}, [category, searchQuery, apiKey]);

	let fetchData = async () => {
		if (!nextPage) return;
		try {
			let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in&page=${nextPage}`;
			if (searchQuery && searchQuery.trim() !== "") {
				url += `&q=${encodeURIComponent(searchQuery.trim())}`;
			} else {
				url += `&category=${category}`;
			}
			let data = await fetch(url);
			let parsedData = await data.json();
			if (parsedData.status === 'success') {
				setArticles((prev) => prev.concat(parsedData.results || []));
				setNextPage(parsedData.nextPage || '');
			} else {
				console.error('API Error:', parsedData.message);
			}
		} catch (error) {
			console.error('Fetch error:', error);
		}
	};

	return (
		<InfiniteScroll
			//This is important field to render the next data
			dataLength={articles.length}
			next={fetchData}
			hasMore={
				articles.length < totalResults
			}
			loader={
				<div className={styles.loader}>
					<h4>Loading...</h4>
				</div>
			}
			endMessage={
				<p className={styles.endMessage}>
					<b>Yay! You have seen it all</b>
				</p>
			}
		>
			<div className={styles.newsContainer}>
				<div className={styles.newsGrid}>
					{articles && articles.map((element) => {
						return (
							<NewsItem
								key={element.article_id}
								sourceName={element.source_name}
								title={element.title}
								desc={element.description}
								imageURL={element.image_url}
								newsUrl={element.link}
							/>
						);
					})}
				</div>
			</div>
		</InfiniteScroll>
	);
}

export default News;