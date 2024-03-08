import React, {useEffect, useState} from 'react';
import {Post, PostComment} from "../../interfaces/posts";
import {PostService} from "../../services/PostService";
import {useParams} from "react-router-dom";
import styles from  './PostPage.module.css'
import CommentCard from "../../components/comment-card/CommentCard";

const PostPage = () => {
    const { postId } = useParams()

    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<PostComment[]>([])
    const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false)
    const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        const fetchPostInfo = async () => {
            if (!postId) {
                return
            }
            setIsPostsLoading(true)
            const response = await PostService.getPostInfo(parseInt(postId))
            if (response) {
                setPost(response)
                setIsPostsLoading(false)
            } else {
                setPost(null)
            }
        }
        fetchPostInfo()

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
        <main className={styles.mainContainer}>
            <section className={styles.postSection}>
                {isPostsLoading ? (
                    <h1>Загрузка...</h1>
                ) : (
                    <>
                        <h1 className={styles.postTitle}>{post?.title}</h1>
                        <div className={styles.postAuthor}>
                            <p>Автор</p>
                            <p>{post?.userId}</p>
                        </div>
                        <div className={styles.postBody}>
                            <p>{post?.body}</p>
                        </div>
                    </>
                )}
            </section>
            <section>
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
            </section>
        </main>
    );
};

export default PostPage;