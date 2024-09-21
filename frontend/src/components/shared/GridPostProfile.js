import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { profile_placeholder } from '../../icons/iconsList';
import PostStats from '../../components/shared/PostStats';
import { jwtDecode } from 'jwt-decode';

const GridPostProfile = ({username}) => {
    const [posts, setPosts] = useState([]);
    // const token = localStorage.getItem('authTokens');
    // const decode = jwtDecode(token);
    // const username = decode.username;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/postlist/');
                // Filter posts to only include those belonging to the logged-in user
                const userPosts = response.data.filter(post => post.username === username);
                // Sort posts by creation time
                const sortedPosts = userPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, [username]); // Depend on username so effect runs when username changes

    return (
        <ul className='grid-container'>
            {posts.map(post => (
                <li key={post.id} className='relative min-h-80 h-80'>
                    <Link to={`/posts/${post.id}`} className='grid-post_link'>
                        <img
                            src={post.post}
                            alt='Post img'
                            className='h-full w-full object-cover'
                        />
                    </Link>
                    <div className='grid-post_user'>
                        <div className='flex items-center justify-start gap-2 flex-1'>
                            <img
                                src={profile_placeholder}
                                alt='creator'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='line-clamp-1'>{post.username}</p>
                        </div>
                        <PostStats postId={post.id} />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GridPostProfile;
