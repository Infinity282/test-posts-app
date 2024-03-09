import React from 'react';
import {Post} from "../../../interfaces/posts";
import styles from './PostCard.module.css'
import {Link} from "react-router-dom";

type PostCardProps = {
    data: Post
}

const PostCard = ({data}: PostCardProps) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardTitle}>
                <p>{data.title}</p>
            </div>
            <div className={styles.cardBody}>
                <p>{data.body}</p>
            </div>
            <div className={styles.cardFooter}>
                <p>Автор {data.userId}</p>
                <Link to={`posts/${data.id}`} className={styles.cardLink}>Подробнее</Link>
            </div>
        </div>
    );
};

export default PostCard;