import React, {useEffect, useState} from 'react';
import {PostService} from "../../../services/PostService";
import {PostComment} from "../../../interfaces/posts";
import styles from "./PostComments.module.css";
import CommentCard from "../../comment/card/CommentCard";

type PostCommentsProps = {
    postId: string | undefined
}

const PostComments = ({postId}: PostCommentsProps) => {

    const [comments, setComments] = useState<PostComment[]>([])
    const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) {
                return
            }
            setIsCommentsLoading(true)
            const response = await PostService.getPostComments(parseInt(postId))
            if (response) {
                setComments(response)
                setIsCommentsLoading(false)
            } else {
                setComments([])
            }
        }
        fetchComments()
    }, [postId])

    return (
        <>
            <h2 className={styles.commentsTitle}>Комментарии</h2>
            {isCommentsLoading ? (
                <p>Загрузка...</p>
            ) : (
                <div className={styles.commentsContainer}>
                    {comments.map((comment) => {
                        return (
                            <CommentCard key={comment.id} data={comment}/>
                        )
                    })}
                </div>
            )}
        </>
    );
};

export default PostComments;