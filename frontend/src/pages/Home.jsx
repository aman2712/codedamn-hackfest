import { useContext, useEffect } from "react";
import { PostsContext } from "../context/PostsContext";
import { AuthContext } from "../context/AuthContext";
import styles from '../styles/pages/Home.module.css'
import TimeAgo from 'react-timeago'

import { AiOutlineHeart, AiFillHeart, AiFillGithub, AiOutlineEye } from 'react-icons/ai'
import { GoCommentDiscussion } from 'react-icons/go'

const Home = () => {
    const { posts, getPosts, likePost, setPosts } = useContext(PostsContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getPosts()
    }, [])

    const handleLikeBtnClick = async (postId, index) => {
        const data = await likePost(postId);
        console.log(postId, index)
        // const updatedPosts = [...posts];
        // console.log(data)

        // if (data.userLiked) {
        //     updatedPosts[index].likes.push(user._id)
        // } else {
        //     updatedPosts[index].likes = updatedPosts[index].likes.filter(id => id !== user._id)
        // }

        // console.log("updated", updatedPosts);
        // setPosts(updatedPosts)

        getPosts()
    }

    console.log(posts)

    return (
        <div className={styles.homepage}>
            <div className={styles.posts}>
                {posts.map((post, index) => (
                    <div key={post._id} className={styles.post}>
                        <div className={styles.postUpper}>
                            <p className={styles.postAuthor}>{post.userId.name}</p>
                            <p className={styles.time}><TimeAgo date={post.createdAt} /></p>
                        </div>
                        <div className={styles.postContent}>
                            <p className={styles.postText}>{post.content}</p>
                            {post.image && (
                                <a href={post.image} target="_blank">
                                    <img src={post.image} alt='Post image' className={styles.postImage} />
                                </a>
                            )}
                        </div>
                        <div className={styles.postBottom}>
                            <span>
                                {post.likes.includes(user._id) ? <AiFillHeart className={styles.icons} size={21} color='#4385FF' onClick={() => handleLikeBtnClick(post._id, index)} /> : <AiOutlineHeart className={styles.icons} size={21} color='#4385FF' onClick={() => handleLikeBtnClick(post._id, index)} />}
                                {post.likes.length}
                            </span>
                            <GoCommentDiscussion className={styles.icons} size={21} color='#4385FF' />
                            {post.githubLink && (
                                <a href={post.githubLink} target='_blank'>
                                    <AiFillGithub className={styles.icons} size={21} />
                                </a>
                            )}
                            {post.liveDemoLink && (
                                <a href={post.liveDemoLink} target='_blank'>
                                    <AiOutlineEye className={styles.icons} size={21} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.leaderboard}>
                <p className={styles.title}>Leaderboard ✨</p>
                <p className={styles.users}>1. Binamra</p>
                <p className={styles.users}>2. Aman</p>
                <p className={styles.users}>3. Lorem</p>
                <p className={styles.users}>4. Ipsum</p>
                <p className={styles.users}>5. Dolor</p>
                <p className={styles.users}>6. Sit</p>
            </div>
        </div >
    );
};

export default Home;