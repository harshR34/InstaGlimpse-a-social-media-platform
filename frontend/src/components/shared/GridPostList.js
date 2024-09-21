import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { profile_placeholder } from '../../icons/iconsList';
import PostStats from '../../components/shared/PostStats';


const GridPostList = () => {
  const [posts,setPosts] = useState([])
  const userImage = null;

  const fetchData = () => {
    // axios.get("http://127.0.0.1:8000/api/postlist/")
    //   .then((res) => {
    //     console.log(res.data)
    //     setPosts(res.data)
    //   })
    //   .catch((error) => { console.log(error) })
    axios.get('http://127.0.0.1:8000/api/postlist/')
      .then((response) => {
        // Sort posts by creation time
        const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPosts(sortedPosts);
        console.log(posts)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <ul className='grid-container'>
      {posts.map((post)=>{
        return ( 
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
                src={userImage || profile_placeholder}
                alt='creator'
                className='h-8 w-8 rounded-full'
              />
              <p className='line-clamp-1'>{post.username}</p>
            </div>
            <PostStats postId={post.id} />
          </div>
        </li>
      )
      })}
    </ul>
  )
}

export default GridPostList