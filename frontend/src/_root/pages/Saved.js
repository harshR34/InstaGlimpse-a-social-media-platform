/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { save, profile_placeholder, saved } from '../../icons/iconsList';
import axios from 'axios';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';
import PostStats from '../../components/shared/PostStats';
import { jwtDecode } from 'jwt-decode';


const Saved = () => {
  const token = localStorage.getItem("authTokens");
  const decode = jwtDecode(token);

  const [posts, setPosts] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const [savedToggle, setSavedToggle] = useState(false);

  const userImage = null;
  const fetchSavedPost = () => {
    axios.get('http://127.0.0.1:8000/api/saved-post-list/')
      .then((response) => {
        setSavedPost(response.data);
      }).catch((error) => { console.log(error) });
  }

  const unSaveTheImage = (e) => {

  }

  const fetchPosts = () => {
    axios.get("http://127.0.0.1:8000/api/postlist/")
      .then((res) => {
        console.log(res.data)
        setPosts(res.data)
      })
      .catch((error) => { console.log(error) })
  }

  useEffect(() => {
    fetchSavedPost();
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    savedPost.some(saved => saved.post_id === post.id && saved.username===decode.username)
  );
  console.log(filteredPosts)

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src={save}
          width={36}
          height={36}
          alt="save"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full" style={{ letterSpacing: '1.5px' }}>Saved Posts</h2>
      </div>
      {!token ?
        (<><Loader /></>)
        :
        (<>
          <ul className="w-full flex justify-center max-w-5xl gap-9">
            {
              filteredPosts.length > 0 ?
                (<>
                  {filteredPosts.map((post) => {
                    return (<>
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
                          <div className='flex gap-2'>
                            <img
                              src={saved}
                              alt='save'
                              width={20}
                              height={20}
                              onClick={(e) => {
                                e.preventDefault();  // Prevent default behavior
                                axios.delete(`http://127.0.0.1:8000/api/deletesavedpost/${decode.username}/${post.id}/`)
                                  .then(() => {
                                    console.log('Post removed from saved list!');
                                    // Immediately update the savedPost state to reflect the deleted post
                                    setSavedPost((prevSavedPosts) =>
                                      prevSavedPosts.filter(saved => saved.post_id !== post.id)
                                    );
                                    setSavedToggle(false);  // This will also trigger a UI update if needed
                                  })
                                  .catch((error) => {
                                    console.error('Error deleting saved post:', error.response ? error.response.data : error.message);
                                  });
                              }}
                              className='cursor-pointer'
                            />
                          </div>

                        </div>
                      </li>
                    </>)
                  })}
                </>)
                :
                (<></>)
            }
          </ul>
        </>)}
    </div>
  )
}

export default Saved