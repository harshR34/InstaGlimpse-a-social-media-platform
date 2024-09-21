import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/socialmedia.png'
import logout from '../../icons/logout.svg';
import AuthContext from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import profileImage from '../../images/profile.png'
import axios from 'axios';

const Topbar = () => {
  const token = localStorage.getItem("authTokens")
  const decode = jwtDecode(token);

  const { logoutUser } = useContext(AuthContext);

  const [profiles, setProfiles] = useState([])
  const [profilePic, setProfilePic] = useState(null);


  const fetchProfile = () => {
    axios.get('http://127.0.0.1:8000/api/user-profile-list/')
      .then((response) => {
        setProfiles(response.data);

        // Find the profile that matches the username from decode
        const userProfile = response.data.find(profile => profile.username === decode.username);

        // If the profile is found, set the profilePic, otherwise set it to null or a default value
        if (userProfile) {
          setProfilePic(userProfile.profilePic);
        } else {
          setProfilePic(null); // Or set to a default picture
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);



  return (
    <div>
      <section className='topbar'>
        <div className='flex-between py-4 px-5'>
          <Link to='/' className='flex gap-3'>
            <img src={logo} alt='Logo'></img>
          </Link>

          <div className='flex gap-4'>
            <button className='shad_button_ghost' onClick={logoutUser}>
              <img src={logout} alt='logout icon'></img>
            </button>
            <Link to={`/profile/${decode.user_id}`} className='flex-center gap-3'>
              <img src={profilePic || profileImage} alt='profile img'
                className='h-8 w-8 rounded-full' />
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Topbar
