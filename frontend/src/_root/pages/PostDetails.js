// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { profile_placeholder, deleteBtn,loader } from '../../icons/iconsList'; // Assuming this is your placeholder icon


// const PostDetails = () => {
//   const token = localStorage.getItem('authTokens');
//   const decode = jwtDecode(token);
//   const { id } = useParams();

//   const [posts, setPosts] = useState([])
//   const calculateTimeDifference = (dateTimeString) => {
//     const inputDateTime = new Date(dateTimeString);
//     const currentDateTime = new Date();
//     const timeDifference = currentDateTime - inputDateTime;
//     const seconds = Math.floor(timeDifference / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);

//     if (days > 0) {
//       return `${days} day(s) ago`;
//     } else if (hours > 0) {
//       return `${hours} hour(s) ago`;
//     } else if (minutes > 0) {
//       return `${minutes} minute(s) ago`;
//     } else {
//       return `${seconds} second(s) ago`;
//     }
//   };

//   const fetchData = () => {
//     // axios.get("http://127.0.0.1:8000/api/postlist/")
//     //   .then((res) => {
//     //     console.log(res.data)
//     //     setPosts(res.data)
//     //   })
//     //   .catch((error) => { console.log(error) })
//     axios.get('http://127.0.0.1:8000/api/postlist/')
//       .then((response) => {
//         // Sort posts by creation time
//         const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//         setPosts(sortedPosts);
//       })
//       .catch((error) => {
//         console.error('Error fetching posts:', error);
//       });
//   }

//   const handleDelete = (e) => {
//     e.preventDefault();
//     axios.delete(`http://127.0.0.1:8000/api/delete-post/${id}/`)
//       .then(response => {
//         console.log('Post deleted successfully!'); // Call a callback to update the UI if needed
//       })
//       .catch(error => {
//         console.error('Error deleting post:', error.response ? error.response.data : error.message);
//       });
//   };

//   useEffect(() => {
//     fetchData()
//   }, []);

//   return (<>
//         {
//           posts.map((post, index) => {
//             return ((post.id===parseInt(id) && decode.username===post.username) ? <>
//               <div className='post_details-container'>
//                 <div className='post_details-card'>
//                   <img
//                     src={post.post}
//                     alt='post img'
//                     className='post_details-img'
//                   />

//                   <div className='post_details-info'>
//                     {/* Link to the user's profile */}

//                     <div className='flex-between w-full'>
//                       <Link
//                         to={`/profile/${decode.user_id}`}
//                         className='flex items-center gap-3'
//                       >
//                         {/* Render the image */}
//                         <img
//                           src={profile_placeholder}
//                           alt='creater'
//                           className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
//                         />

//                         <div className='flex flex-col'>
//                           <p className='base-medium lg:body-bold text-light-1'>
//                             {post.username}
//                           </p>
//                           <div className='flex-center gap-2 text-light-3'>
//                             <p className='subtle-semibold lg:small-regular'>
//                               {calculateTimeDifference(post.created_at)}
//                             </p>
//                             -
//                             <p className='subtle-semibold lg:small-regular'>
//                               {post.location}
//                             </p>
//                           </div>
//                         </div>
//                       </Link>

//                       <div className='flex-center'>
//                         {/* <Link>Update Post</Link> */}

//                         <button onClick={handleDelete}
//                           className={`ghost_details-delete_btn ${decode.username !== post.username && 'hidden'}`}
//                         >
//                           <img src={deleteBtn} alt='delete post button' />
//                         </button>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </> : <></>)
//           })
//         }
//     </>
//   )
// }

// export default PostDetails

import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { profile_placeholder, deleteBtn, loader } from '../../icons/iconsList'; // Assuming this is your placeholder icon
import PostStats from '../../components/shared/PostStats';


const PostDetails = () => {
  const token = localStorage.getItem('authTokens');
  const decode = jwtDecode(token);
  const { id } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading

  const calculateTimeDifference = (dateTimeString) => {
    const inputDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();
    const timeDifference = currentDateTime - inputDateTime;
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

  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/postlist/')
      .then((response) => {
        // Sort posts by creation time
        const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the request
    axios.delete(`http://127.0.0.1:8000/api/delete-post/${id}/`)
      .then(response => {
        console.log('Post deleted successfully!');
        setLoading(false); // Set loading to false after the request completes
        // Optionally refresh the post list or redirect
        fetchData(); // Refresh the posts after deletion
        
      })
      .catch(error => {
        console.error('Error deleting post:', error.response ? error.response.data : error.message);
        setLoading(false); // Set loading to false if an error occurs
      });
      navigate('/')
  };

  useEffect(() => {
    fetchData();
  }, []);
  // decode.username === post.username
  return (
    <>
      {
        posts.map((post, index) => {
          return ((post.id === parseInt(id)) ? (
            <div className='post_details-container' key={index}>
              <div className='post_details-card'>
                <img
                  src={post.post}
                  alt='post img'
                  className='post_details-img'
                />

                <div className='post_details-info'>
                  <div className='flex-between w-full'>
                    <Link
                      to={`/profile/${decode.user_id}`}
                      className='flex items-center gap-3'
                    >
                      <img
                        src={profile_placeholder}
                        alt='creator'
                        className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                      />
                      <div className='flex flex-col'>
                        <p className='base-medium lg:body-bold text-light-1'>
                          {post.username}
                        </p>
                        <div className='flex-center gap-2 text-light-3'>
                          <p className='subtle-semibold lg:small-regular'>
                            {calculateTimeDifference(post.created_at)}
                          </p>
                          -
                          <p className='subtle-semibold lg:small-regular'>
                            {post.location}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className='flex-center'>
                      {loading ? (
                        <img src={loader} alt='loading' /> // Render loader while loading
                      ) : (
                        <button onClick={handleDelete}
                          className={`ghost_details-delete_btn ${decode.username !== post.username && 'hidden'}`}
                        >
                          <img src={deleteBtn} alt='delete post button' />
                        </button>
                      )}
                    </div>
                  </div>

                  <hr className='border w-full border-dark-4/80'/>

                  <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
                    <p>
                        {post.caption}
                    </p>
                    <p className='text-light-3'>
                        {post.tags}
                    </p>
                </div>

                <div className='w-full'>
                <PostStats postId={post.id} />
                </div>

                </div>
              </div>
            </div>
          ) : <></>)
        })
      }
    </>
  );
}

export default PostDetails;
