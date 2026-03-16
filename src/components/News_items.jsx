import React from "react";
import styles from "./newsitem.module.css";

const NewsItem = ({ title, desc, imageURL, newsUrl, sourceName }) => {
	return (
		<article className={styles.newsItem}>
			<div className={styles.card}>
				<div className={styles.badgeContainer}>
					<span className={styles.badge}>{sourceName}</span>
				</div>
				<img
					className={styles.image}
					src={
						imageURL ||
						"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
					}
					alt={title || "News image"}
				/>
				<div className={styles.body}>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>{desc}</p>
					<a
						rel="noreferrer"
						href={newsUrl}
						target="_blank"
						className={styles.button}
					>
						Read more
					</a>
				</div>
			</div>
		</article>
	);
};

export default NewsItem;
