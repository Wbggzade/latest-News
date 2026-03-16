

import { React, useState, useEffect } from "react";
import NewsItem from "./News_items";
import InfiniteScroll
	from "react-infinite-scroll-component";
import styles from "./news.module.css";

function News(props) {
	let category = props.category;
	let [articles, setArticles] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [nextPage, setNextPage] = useState('');

	useEffect(() => {
		const resultNews = async () => {
			try {
				const url = `https://newsdata.io/api/1/latest?apikey=pub_3303ddc5f96d4d2ea2d277e9866c9c7f&category=${category}&country=in`;
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
	}, [category]);

	let fetchData = async () => {
		try {
			const url = `https://newsdata.io/api/1/latest?apikey=pub_3303ddc5f96d4d2ea2d277e9866c9c7f&category=${category}&country=in&page=${nextPage}`;
			let data = await fetch(url);
			let parsedData = await data.json();
			if (parsedData.status === 'success') {
				setArticles(articles.concat(parsedData.results || []));
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
				<h4 className="text-center">
					Loading...
				</h4>}
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