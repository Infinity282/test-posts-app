import React from 'react';
import {PostComment} from "../../interfaces/posts";
import styles from './CommentCard.module.css'

type CommentCardProps = {
    data: PostComment
}

const CommentCard = ({data}: CommentCardProps) => {
    return (
        <div className={styles.commentContainer}>
            <h3 className={styles.commentName}>{data.name}</h3>
            <p className={styles.commentEmail}>{data.email}</p>
            <p>{data.body}</p>
        </div>
    );
};

export default CommentCard;