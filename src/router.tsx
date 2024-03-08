import {createBrowserRouter} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import PostPage from "./pages/post/PostPage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "posts/:postId",
        element: <PostPage />,
    }
], {basename: process.env.IS_DEPLOY === 'true' ? '/test-posts-app/' : '/'})

