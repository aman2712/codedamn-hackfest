import { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    const getPosts = async () => {
        try {
            const { data } = await axios.get("/api/posts")
            setPosts(data);
        } catch (error) {
            // toast.error(error.response.data.message);
        }
    }

    const createPost = async (content, image, githubLink, liveDemoLink) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const result = await axios.post("/api/posts/create", { content, image, githubLink, liveDemoLink }, config);
            console.log(result)
        } catch (error) {
            // Will do later
        }
    }

    const likePost = async (_id) => {
        try {
            console.log(_id);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const result = await axios.put(`/api/posts/like/${_id}`, null, config);
            console.log(result.data)
            return result.data;
        } catch (error) {
            // Will do later
            console.log(error)
        }
    }

    return (
        <PostsContext.Provider
            value={{ posts, createPost, getPosts, likePost, setPosts }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;