import React, {useEffect, useState} from 'react';
import {Post} from "../../interfaces/posts";
import {PostService} from "../../services/PostService";
import {useParams} from "react-router-dom";
import styles from  './PostPage.module.css'
import PostComments from "../../components/post/comments/PostComments";

const PostPage = () => {
    const { postId } = useParams()

    const [post, setPost] = useState<Post | null>(null)
    const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false)
    
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
                <PostComments postId={postId} />
            </section>
        </main>
    );
};

export default PostPage;