import React, {useEffect, useState} from 'react';
import {PostService} from "../../services/PostService";
import {Post} from "../../interfaces/posts";
import PostCard from "../../components/post/card/PostCard";
import styles from './HomePage.module.css'
import Pagination from "../../components/pagination/Pagination";
import {PageResponse} from "../../interfaces/server";
import {useSearchParams} from "react-router-dom";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1')

    const [posts, setPosts] = useState<PageResponse<Post[]> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChangePage = (pageNumber: number) => {
        setSearchParams({ page: `${pageNumber}` })
    }

    useEffect(() => {
        const fetchAllPosts = async () => {
            setIsLoading(true)
            const response = await PostService.getAllPosts(page)
            if (response) {
                setPosts(response)
                setIsLoading(false)
            } else {
                setPosts(null)
            }
        }
        fetchAllPosts()
    }, [page])

    return (
        <main className={styles.mainContainer}>
            <div className={styles.header}>
                <h2 className={styles.mainTitle}>Недавние посты</h2>
            </div>
            <div className={styles.cardContainer}>
                {isLoading ? (
                    <h1>Загрузка...</h1>
                ) : (
                    posts?.data.map((post) => {
                        return <PostCard key={post.id} data={post}/>
                    })
                )}
            </div>
            <div className={styles.paginationContainer}>
                <Pagination currentPage={page} totalCount={posts?.totalCount || 0} pageLimit={10} onPageChange={handleChangePage} />
            </div>
        </main>
    )}

export default HomePage;