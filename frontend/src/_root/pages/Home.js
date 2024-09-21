import axios from 'axios';
import Loader from '../../components/shared/Loader';
import React, { useState, useEffect } from 'react'
import PostCard from '../../components/shared/PostCard';

const Home = () => {
  const isPostLoading = true;
  const [posts, setPosts] = useState([])

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
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  

  useEffect(() => {
    fetchData();
  }, [])
  // Function to calculate time difference between given date and now
  const calculateTimeDifference = (dateTimeString) => {
    // Convert the string to a JavaScript Date object
    const inputDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();

    // Get the difference in milliseconds
    const timeDifference = currentDateTime - inputDateTime;

    // Convert milliseconds to seconds, minutes, hours, or days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  };
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {
            (isPostLoading && !posts) ?
              (<>
                <Loader />
              </>)
              :
              (<>
                <ul className='flex flex-col flex-1 gap-9 w-full'>
                  {posts.map((post) => {
                    return (<>
                      <PostCard key={post.id} post={post} />
                    </>);
                  })}
                </ul>
              </>)
          }
        </div>
      </div>
    </div>
  )
}

export default Home