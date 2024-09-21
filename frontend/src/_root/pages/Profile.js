import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { profile_placeholder, edit, postsIcon } from '../../icons/iconsList';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import GridPostProfile from '../../components/shared/GridPostProfile';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const { id } = useParams();
  const token = localStorage.getItem('authTokens');
  const decode = jwtDecode(token);
  const { pathname } = useLocation();

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-profile-list/');
        setProfiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/postlist/');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, []);

  useEffect(() => {
    // Set user profile when profiles data changes
    if (profiles.length > 0) {
      const profile = profiles.find(pro => pro.id === parseInt(id));
      if (profile) {
        setUserProfile(profile);
      }
    }
  }, [profiles, id]);

  // Filter user-specific posts when posts data or userProfile changes
  const userPosts = posts.filter(post => post.username === (userProfile?.username || decode.username));

  const StatBlock = ({ value, label }) => (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );

  // Extract individual variables
  const userId = userProfile?.id;
  const username = userProfile?.username;
  const name = userProfile?.name || decode.full_name;
  const profilePic = userProfile?.profilePic || profile_placeholder;
  const bio = userProfile?.bio || '';

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={profilePic}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{decode.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={userPosts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${username !== decode.username && "hidden"}`}>
              <Link
                to={`/update-profile/${userId}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  username !== decode.username && "hidden"
                }`}>
                <img
                  src={edit}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${username === decode.username && "hidden"}`}>
              <button type="button" className="shad-button_primary px-8">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {username === decode.username && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${userId}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${userId}` && "!bg-dark-3"
            }`}>
            <img
              src={postsIcon}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
        </div>
      )}

      <GridPostProfile username={username} />
    </div>
  );
};

export default Profile;
