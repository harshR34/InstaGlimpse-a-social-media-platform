// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { profile_placeholder, details } from '../../icons/iconsList'; // Assuming this is your placeholder icon
// import { jwtDecode } from 'jwt-decode';
// import PostStats from '../../components/shared/PostStats';
// import axios from 'axios';

// const PostCard = ({ post }) => {
//     const token = localStorage.getItem('authTokens');
//     const decode = jwtDecode(token);
    
//     const postImage = post.post;
//     console.log(postImage)
    
//     // Function to calculate time difference
//     const calculateTimeDifference = (dateTimeString) => {
//         const inputDateTime = new Date(dateTimeString);
//         const currentDateTime = new Date();
//         const timeDifference = currentDateTime - inputDateTime;
//         const seconds = Math.floor(timeDifference / 1000);
//         const minutes = Math.floor(seconds / 60);
//         const hours = Math.floor(minutes / 60);
//         const days = Math.floor(hours / 24);
        
//         if (days > 0) {
//             return `${days} day(s) ago`;
//         } else if (hours > 0) {
//             return `${hours} hour(s) ago`;
//         } else if (minutes > 0) {
//             return `${minutes} minute(s) ago`;
//         } else {
//             return `${seconds} second(s) ago`;
//         }
//     };

//     const [Profiles, setProfiles] = useState([])
//     const fetchProfile = () => {
//         axios.get('http://127.0.0.1:8000/api/user-profile-list/').then((response) => {
//             setProfiles(response.data);
//         }).catch((error) => { console.log(error) })
//     }

//     useEffect(()=>{
//         fetchProfile();
        
//     },[])

//     return (
//         <div className='post-card'>
//             <div className='flex-between'>
//                 <div className='flex items-center gap-3'>
//                     {/* Link to the user's profile */}
//                     <Link to={`/profile/${decode.user_id}`}>
//                         {/* Render the image */}
//                         <img
//                             src={profile_placeholder}
//                             alt='creater'
//                             className="rounded-full w-12 lg:h-12"
//                         />
//                     </Link>
//                     <div className='flex flex-col'>
//                         <p className='base-medium lg:body-bold text-light-1'>
//                             {post.username}
//                         </p>
//                         <div className='flex-center gap-2 text-light-3'>
//                             <p className='subtle-semibold lg:small-regular'>
//                                 {calculateTimeDifference(post.created_at)}
//                             </p>
//                             -
//                             <p className='subtle-semibold lg:small-regular'>
//                                 {post.location}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <Link
//                     to={`/posts/${post.id}`}
//                     className={`${post.username !== decode.username && "hidden"}`}>
//                     <img
//                         src={details}
//                         alt='post-details'
//                         width={15}
//                         height={15}
//                     />
//                 </Link>
//             </div>

//             <Link to={`/posts/${post.id}`}>
//                 <div className='small-medium lg:base-medium py-5'>
//                     <p>
//                         {post.caption}
//                     </p>
//                     <p className='text-light-3'>
//                         {post.tags}
//                     </p>
//                 </div>
//                 <img
//                     src={postImage || profile_placeholder}
//                     className='post-card_image rounded-xl'
//                     alt='post img'
//                 />
//             </Link>
//             <PostStats postId={post.id} />
//         </div>
//     );
// };

// export default PostCard;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile_placeholder, details } from '../../icons/iconsList'; // Assuming this is your placeholder icon
import { jwtDecode } from 'jwt-decode';
import PostStats from '../../components/shared/PostStats';
import axios from 'axios';

const PostCard = ({ post }) => {
    const token = localStorage.getItem('authTokens');
    const decode = jwtDecode(token);

    const [profiles, setProfiles] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user-profile-list/');
                setProfiles(response.data);
                const matchedProfile = response.data.find(profile => profile.username === post.username);
                setProfile(matchedProfile || null);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, [post.username]); // Refetch profiles if post.username changes

    // Function to calculate time difference
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

    return (
        <div className='post-card'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    {/* Link to the user's profile */}
                    <Link to={`/profile/${profile ? profile.id : ''}`}>
                        {/* Render the image */}
                        <img
                            src={profile ? profile.profilePic : profile_placeholder}
                            alt='creator'
                            className="rounded-full w-12 lg:h-12"
                        />
                    </Link>
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
                </div>
                <Link
                    to={`/posts/${post.id}`}
                    className={`${post.username !== decode.username && "hidden"}`}
                >
                    <img
                        src={details}
                        alt='post-details'
                        width={15}
                        height={15}
                    />
                </Link>
            </div>

            <Link to={`/posts/${post.id}`}>
                <div className='small-medium lg:base-medium py-5'>
                    <p>
                        {post.caption}
                    </p>
                    <p className='text-light-3'>
                        {post.tags}
                    </p>
                </div>
                <img
                    src={post.post || profile_placeholder}
                    className='post-card_image rounded-xl'
                    alt='post img'
                />
            </Link>
            <PostStats postId={post.id} />
        </div>
    );
};

export default PostCard;
