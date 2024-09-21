// import React, { useContext } from 'react'
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import logo from '../../images/socialmedia.png'
// import { jwtDecode } from 'jwt-decode';
// import profileImage from '../../images/profile.png'
// import { sidebarLinks } from '../../constant/Links';
// import logout from '../../icons/logout.svg';
// import AuthContext from '../../context/AuthContext';

// const LeftSidebar = () => {
//   const { pathname } = useLocation();

//   const token = localStorage.getItem("authTokens")
//   const decode = jwtDecode(token);

//   const { logoutUser } = useContext(AuthContext);

//   return (
//     <div>
//       <nav className='leftsidebar'>
//         <div className='flex flex-col gap-11'>
//           <Link to='/' className='flex gap-3'>
//             <img src={logo} alt='Logo'></img>
//           </Link>

//           <Link to={`/profile/${decode.user_id}`} className='flex gap-3 items-center mx-4'>
//             <img src={profileImage} alt='profile img' className='h-14 w-14 rounded-full'></img>

//             <div className='flex flex-col'>
//               <p className='body-bold'>
//                 {decode.full_name}
//               </p>

//               <p className='small-regular text-light-3'>
//                 @{decode.username}
//               </p>
//             </div>
//           </Link>


//           <ul className='flex flex-col gap-6'>
//             {sidebarLinks.map((links) => {
//               const isActive = pathname === links.route;

//               return (<>
//                 <li key={links.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
//                   <NavLink to={links.route}
//                     className='flex gap-4 items-center p-4'
//                   >
//                     <img src={links.imgURL} alt={links.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}></img>
//                     {links.label}
//                   </NavLink>
//                 </li >
//               </>);
//             })}
//           </ul>
//         </div>

//         <button className='shad_button_ghost' onClick={logoutUser}>
//           <img src={logout} alt='logout icon'></img>
//         </button>
//       </nav>
//     </div>
//   )
// }

// export default LeftSidebar

import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/socialmedia.png'
import { jwtDecode } from 'jwt-decode';
import profileImage from '../../images/profile.png'
import { sidebarLinks } from '../../constant/Links';
import logout from '../../icons/logout.svg';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
const LeftSidebar = () => {
  const { pathname } = useLocation();

  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens")
  const decode = jwtDecode(token);

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

  const user = profiles.find(pro=>pro.username===decode.username);

  return (
    <div>
      <nav className='leftsidebar h-full flex flex-col justify-between'>
        <div className='flex flex-col gap-11'>
          <Link to='/' className='flex gap-3'>
            <img src={logo} alt='Logo'></img>
          </Link>

          <Link to={`/profile/${user?.id}`} className='flex gap-3 items-center mx-4'>
            <img src={profilePic} alt='profile img' className='h-14 w-14 rounded-full'></img>

            <div className='flex flex-col'>
              <p className='body-bold'>
                {decode.full_name}
              </p>

              <p className='small-regular text-light-3'>
                @{decode.username}
              </p>
            </div>
          </Link>

          <ul className='flex flex-col gap-6'>
            {sidebarLinks.map((links) => {
              const isActive = pathname === links.route;

              return (
                <li key={links.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                  <NavLink to={links.route} className='flex gap-4 items-center p-4'>
                    <img src={links.imgURL} alt={links.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}></img>
                    {links.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout button aligned at the bottom */}
        <div className="flex justify-start p-4">
          <button className='shad_button_ghost flex gap-4' onClick={logoutUser}>
            <img src={logout} alt='logout icon'></img>
            <p className='small-medium lg:base-medium'>Logout</p>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar;
