import React from 'react';
import styles from './newsitem.module.css';

const NewsItem = (props) => {
    let { title, desc, imageURL, newsUrl, sourceName } = props;
    return (
        <div className={`my-3 ${styles.newsItem}`}>
            <div className="card">
                <div className={styles.badgeContainer}>
                    <span className="badge rounded-pill bg-danger"> {sourceName} </span>
                </div>
                <img src={!imageURL ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}  </h5>
                    <p className="card-text">{desc}</p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
