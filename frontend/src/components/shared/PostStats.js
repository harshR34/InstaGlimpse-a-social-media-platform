import React, { useEffect, useState } from 'react';
import { like, liked, save, saved } from '../../icons/iconsList';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PostStats = ({ postId }) => {
    const [data, setData] = useState([]);
    const [newD, setNew] = useState({});
    const [likes, setLikes] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [savedToggle, setSavedToggle] = useState(false);

    const token = localStorage.getItem('authTokens');
    const decode = jwtDecode(token);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/api/postlist/')
            .then((res) => {
                const post = res.data.find((post) => post.id === postId);
                if (post) {
                    setData(res.data);
                    setLikes(post.likes);
                    setNew(post);
                    setSavedToggle(post.saved); // Assuming post.saved indicates if the post is saved
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };


    const handleClick = () => {
        const updatedLikes = toggle ? likes - 1 : likes + 1;
        setToggle(!toggle);

        const formData = new FormData();
        formData.append('username', newD.username);
        formData.append('caption', newD.caption);
        formData.append('location', newD.location);
        formData.append('tags', newD.tags);
        formData.append('created_at', newD.created_at);
        formData.append('likes', updatedLikes);

        if (newD.post?.file) {
            formData.append('post', newD.post.file);
        }

        axios.put(`http://127.0.0.1:8000/api/postupdate/${postId}/`, formData)
            .then(() => {
                console.log('Like updated successfully!');
                setLikes(updatedLikes);
            })
            .catch((error) => {
                console.error('Error updating like:', error.response ? error.response.data : error.message);
            });
    };

    const handleSaving = (e) => {
        e.preventDefault();

        if (!savedToggle) {
            const form = new FormData();
            form.append('username', decode.username);
            form.append('post_id', postId);

            axios.post('http://127.0.0.1:8000/api/add-saved-post/', form)
                .then(() => {
                    console.log('Post saved successfully!');
                    setSavedToggle(true);
                })
                .catch((error) => {
                    console.error('Error saving post:', error.response ? error.response.data : error.message);
                });
        } else {
            axios.delete(`http://127.0.0.1:8000/api/delete-saved-post/${postId}/`)
                .then(() => {
                    console.log('Post removed from saved list!');
                    setSavedToggle(false);
                })
                .catch((error) => {
                    console.error('Error deleting saved post:', error.response ? error.response.data : error.message);
                });
        }
    };

    return (
        <>
            <div className='flex justify-between items-center z-20 mt-3'>
                <div className='flex gap-2 mr-5'>
                    <img
                        src={toggle ? liked : like}
                        alt='like'
                        width={20}
                        height={20}
                        onClick={handleClick}
                        className='cursor-pointer'
                    />
                    <p>{likes}</p>
                </div>

                <div className='flex gap-2'>
                    <img
                        src={savedToggle ? saved : save}
                        alt='save'
                        width={20}
                        height={20}
                        onClick={handleSaving}
                        className='cursor-pointer'
                    />
                </div>
            </div>
        </>
    );
};

export default PostStats;

