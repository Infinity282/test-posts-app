import {Post, PostComment} from "../interfaces/posts";
import {PageResponse} from "../interfaces/server";

const ApiURL = 'https://jsonplaceholder.typicode.com'

export const PostService = {
    async getAllPosts(page = 1): Promise<PageResponse<Post[]> | null> {
        try {
            const response = await fetch(`${ApiURL}/posts?_page=${page}`, {
                method: 'GET',
            })
            if (response.ok) {
                const totalElements = response.headers.get('X-Total-Count')
                const responseBody = await response.json() as Post[]
                return {
                    data: responseBody,
                    totalCount: parseInt(totalElements || '0'),
                }
            }
            return null
        } catch (e) {
            console.error(e)
            return null
        }
    },

    async getPostInfo(id: number): Promise<Post | null> {
        try {
            const response = await fetch(`${ApiURL}/posts/${id}`, {
                method: 'GET',
            })
            if (response.ok) {
                return await response.json()
            }
            return null
        } catch (e) {
            console.error(e)
            return null
        }
    },

    async getPostComments(id: number): Promise<PostComment[] | null> {
        try {
            const response = await fetch(`${ApiURL}/posts/${id}/comments`, {
                method: 'GET',
            })
            if (response.ok) {
                return await response.json()
            }
            return null
        } catch (e) {
            console.error(e)
            return null
        }
    },
}