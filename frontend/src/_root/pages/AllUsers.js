// import React, { useEffect, useState } from 'react'
// import { allUser } from '../../icons/iconsList'
// import axios from 'axios'
// import Loader from '../../components/shared/Loader'
// import UserCard from '../../components/shared/UserCard'

// const AllUsers = () => {

//   const [profiles, setProfiles] = useState([])


//   const fetchProfile = () => {
//     axios.get('http://127.0.0.1:8000/api/user-profile-list/').then((response) => {
//       setProfiles(response.data);
//     }).catch((error) => { console.log(error) })
//   }

//   useEffect(()=>{
//     fetchProfile();
//   },[])

//   return (
//     <div className="common-container">
//       <div className="user-container flex">
//         <div className='flex flex-1 gap-3'>
//           <img
//             src={allUser}
//             alt='All user icon'
//           />
//           <h1 className="h1-bold md:h1-bold text-left w-full" style={{ letterSpacing: '1.5px' }}>All Users</h1>
//         </div>

//         {profiles.length===0 ? 
//         (<><Loader/></>)
//         :
//         (<>
//           {profiles.map((creator)=>{
//             return(
//             <>
//               <li key={creator?.id} className="flex-1 min-w-[200px] w-full  ">
//                 <UserCard user={creator} />
//               </li>
//             </>
//             );
//           })}
//         </>)}
//       </div>
//     </div>
//   )
// }

// export default AllUsers
import React, { useEffect, useState } from 'react';
import { allUser } from '../../icons/iconsList';
import axios from 'axios';
import Loader from '../../components/shared/Loader';
import UserCard from '../../components/shared/UserCard';

const AllUsers = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // Search query state

  const fetchProfile = () => {
    axios.get('http://127.0.0.1:8000/api/user-profile-list/')
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => { 
        console.log(error); 
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Filter profiles based on the search query
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="common-container">
      <div className="user-container flex flex-col">
        {/* Header and Search Bar */}
        <div className='flex flex-1 flex-col gap-3 items-center mb-4 w-full'>
          <div className='flex flex-row gap-3'>
            <img
              src={allUser}
              alt='All user icon'
            />
            <h1 className="h1-bold md:h1-bold text-left w-full" style={{ letterSpacing: '1.5px' }}>
              All Users
            </h1>
          </div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="explore-search w-full p-2 rounded-lg"
          />
        </div>

        {/* Loader or User List */}
        {profiles.length === 0 ? (
          <Loader />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((creator) => (
                <li key={creator?.id} className="min-w-[200px] w-full">
                  <UserCard user={creator} />
                </li>
              ))
            ) : (
              <p className="text-gray-500">No users found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllUsers;

