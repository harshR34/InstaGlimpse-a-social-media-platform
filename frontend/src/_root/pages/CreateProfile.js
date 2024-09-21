// import { people, file_upload } from '../../icons/iconsList'
// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// const swal = require('sweetalert2');

// const CreateProfile = () => {
//     const [name, setName] = useState('')
//     const [bio, setBio] = useState('')
//     const [isDragOver, setIsDragOver] = useState(false);
//     const [photo, setPhoto] = useState(null); // Only allow one photo
//     const navigate = useNavigate()

//     const token = localStorage.getItem("authTokens");
//     const decode = jwtDecode(token);
//     const [profiles, setProfiles] = useState([])

//     const fetchProfile = () => {
//         axios.get('http://127.0.0.1:8000/api/user-profile-list/').then((response) => {
//             setProfiles(response.data);
//         }).catch((error) => { console.log(error) })
//     }
//     useEffect(() => {
//         fetchProfile();
//         const username = profiles.filter(profile=>profile.username===decode.username)
//         console.log(username)
//         if (username){
//             navigate('/');
//         }
//     }, []);

//     const createProfile = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('username', decode.username);
//         formData.append('name', name);
//         formData.append('bio', bio);
//         // Ensure the file exists before appending
//         if (photo?.file) {
//             formData.append('profilePic', photo.file); // Append the image file to the FormData
//         }

//         axios.post('http://127.0.0.1:8000/api/create-user-profile/', formData).then((res) => {
//             console.log('Profile created successfully');
//             navigate('/');
//             if (res.status === 201) {
//                 swal.fire({
//                     title: "Post Created",
//                     icon: "success",
//                     toast: true,
//                     timer: 6000,
//                     position: 'top-right',
//                     timerProgressBar: true,
//                     showConfirmButton: false
//                 });
//             } else {
//                 console.log(res.status);
//                 console.log("An Error Occured");
//                 swal.fire({
//                     title: "There was a server error during creating a post",
//                     icon: "error",
//                     toast: true,
//                     timer: 6000,
//                     position: 'top-right',
//                     timerProgressBar: true,
//                     showConfirmButton: false
//                 });
//             }
//         })
//     }

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         previewPhoto(file);
//     };

//     // Handle drag and drop (only one photo)
//     const handleDrop = (e) => {
//         e.preventDefault();
//         setIsDragOver(false);
//         const file = e.dataTransfer.files[0];
//         previewPhoto(file);
//     };

//     const previewPhoto = (file) => {
//         const photoObject = {
//             url: URL.createObjectURL(file),
//             file,
//         };
//         setPhoto(photoObject);
//     };

//     // Remove photo
//     const removePhoto = () => {
//         setPhoto(null);
//     };

//     return (
//         <>
//             <div className='flex flex-1 flex-col relative'>
//                 {/* Header: fixed/sticky at the top */}
//                 <div className='sticky top-0 z-50 bg-black w-full p-4'>
//                     <div className='flex items-center gap-3 mt-4'>
//                         <img
//                             src={people}
//                             width={36}
//                             height={36}
//                             alt='add_post'
//                         />
//                         <h2 className='text-2xl md:text-3xl font-bold text-left tracking-wide text-white'>
//                             Create Profile
//                         </h2>
//                     </div>
//                 </div>
//                 <div className="flex justify-center items-center bg-black min-h-screen">
//                     <div className="w-full max-w-3xl text-white p-6 rounded-lg">
//                         <form className='flex flex-col gap-9 w-full max-w-5xl' onSubmit={createProfile}>
//                             {/* Caption */}
//                             <div className="mb-6 w-full flex flex-col">
//                                 <label className="shad-form_label" htmlFor="caption">
//                                     Name
//                                 </label>
//                                 <input
//                                     style={{ letterSpacing: "1.5px" }}
//                                     id="location"
//                                     className="shad-input p-2"
//                                     placeholder="Add a name"
//                                     value={name}
//                                     onChange={(e) => { setName(e.target.value) }}  // Manually setting value in case user types manually
//                                 />
//                             </div>

//                             {/* Add Photos */}
//                             <div className="mb-6 w-full">
//                                 <label className="shad-form_label">Add Profile Pic</label>
//                                 <div
//                                     className={`border-2 ${isDragOver ? 'border-blue-500' : 'border-dashed border-gray-500'} 
//               rounded-lg p-6 flex flex-col items-center justify-center relative w-full`}
//                                     onDragOver={(e) => {
//                                         e.preventDefault();
//                                         setIsDragOver(true);
//                                     }}
//                                     onDragLeave={() => setIsDragOver(false)}
//                                     onDrop={handleDrop}
//                                 >
//                                     {!photo ? (
//                                         <>
//                                             <img src={file_upload} alt="file upload" className="h-16 w-16 text-gray-500 mb-4" />
//                                             <p className="text-gray-400 mb-4">Click or drag to upload a photo</p>
//                                             <p className="text-gray-400 text-xs">SVG, PNG, JPG</p>
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                                                 onChange={handleFileUpload}
//                                             />
//                                         </>
//                                     ) : (
//                                         <div className="w-full relative">
//                                             <img
//                                                 src={photo.url}
//                                                 alt="uploaded"
//                                                 className="w-full h-auto object-cover rounded-lg"
//                                             />
//                                             <p className="text-center text-gray-400 mt-2">Click or drop photo to replace</p>
//                                             <button
//                                                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
//                                                 onClick={removePhoto}
//                                             >
//                                                 &times;
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Add Location */}
//                             <div className="mb-6 w-full">
//                                 <label className="block text-sm mb-2" htmlFor="location">
//                                     Bio
//                                 </label>
//                                 <input
//                                     style={{ letterSpacing: "1.5px" }}
//                                     id="location"
//                                     className="shad-input p-2"
//                                     placeholder="Add a bio"
//                                     value={bio}
//                                     onChange={(e) => { setBio(e.target.value) }}  // Manually setting value in case user types manually
//                                 />
//                             </div>
//                             <div className='flex gap-4 items-center justify-end'>
//                                 <button
//                                     type='submit'
//                                     className='shad-button_primary p-3'
//                                 >
//                                     Create
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default CreateProfile

import { people, file_upload } from '../../icons/iconsList'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const swal = require('sweetalert2');


const CreateProfile = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [photo, setPhoto] = useState(null); // Only allow one photo
    const navigate = useNavigate();

    const token = localStorage.getItem("authTokens");
    const decode = jwtDecode(token);
    const [profiles, setProfiles] = useState([]);

    const fetchProfile = () => {
        axios.get('http://127.0.0.1:8000/api/user-profile-list/')
            .then((response) => {
                setProfiles(response.data);
                const profileExists = response.data.some(profile => profile.username === decode.username);
                if (!profileExists) {
                    navigate('/create-profile');
                }
                else{
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchProfile();
    }, []); // Empty dependency array to ensure it only runs once on component mount

    const createProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', decode.username);
        formData.append('name', name);
        formData.append('bio', bio);

        // Ensure the file exists before appending
        if (photo?.file) {
            formData.append('profilePic', photo.file); // Append the image file to the FormData
        }

        axios.post('http://127.0.0.1:8000/api/create-user-profile/', formData)
            .then((res) => {
                console.log('Profile created successfully');
                navigate('/');
                if (res.status === 201) {
                    swal.fire({
                        title: "Profile Created",
                        icon: "success",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } else {
                    console.log("An Error Occurred");
                    swal.fire({
                        title: "There was a server error during profile creation",
                        icon: "error",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
            });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        previewPhoto(file);
    };

    // Handle drag and drop (only one photo)
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        previewPhoto(file);
    };

    const previewPhoto = (file) => {
        const photoObject = {
            url: URL.createObjectURL(file),
            file,
        };
        setPhoto(photoObject);
    };

    // Remove photo
    const removePhoto = () => {
        setPhoto(null);
    };

    return (
        <>
            <div className='flex flex-1 flex-col relative'>
                {/* Header: fixed/sticky at the top */}
                <div className='sticky top-0 z-50 bg-black w-full p-4'>
                    <div className='flex items-center gap-3 mt-4'>
                        <img
                            src={people}
                            width={36}
                            height={36}
                            alt='add_post'
                        />
                        <h2 className='text-2xl md:text-3xl font-bold text-left tracking-wide text-white'>
                            Create Profile
                        </h2>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-black min-h-screen">
                    <div className="w-full max-w-3xl text-white p-6 rounded-lg">
                        <form className='flex flex-col gap-9 w-full max-w-5xl' onSubmit={createProfile}>
                            {/* Caption */}
                            <div className="mb-6 w-full flex flex-col">
                                <label className="shad-form_label" htmlFor="caption">
                                    Name
                                </label>
                                <input
                                    style={{ letterSpacing: "1.5px" }}
                                    id="location"
                                    className="shad-input p-2"
                                    placeholder="Add a name"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>

                            {/* Add Photos */}
                            <div className="mb-6 w-full">
                                <label className="shad-form_label">Add Profile Pic</label>
                                <div
                                    className={`border-2 ${isDragOver ? 'border-blue-500' : 'border-dashed border-gray-500'} 
              rounded-lg p-6 flex flex-col items-center justify-center relative w-full`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragOver(true);
                                    }}
                                    onDragLeave={() => setIsDragOver(false)}
                                    onDrop={handleDrop}
                                >
                                    {!photo ? (
                                        <>
                                            <img src={file_upload} alt="file upload" className="h-16 w-16 text-gray-500 mb-4" />
                                            <p className="text-gray-400 mb-4">Click or drag to upload a photo</p>
                                            <p className="text-gray-400 text-xs">SVG, PNG, JPG</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                                onChange={handleFileUpload}
                                            />
                                        </>
                                    ) : (
                                        <div className="w-full relative">
                                            <img
                                                src={photo.url}
                                                alt="uploaded"
                                                className="w-full h-auto object-cover rounded-lg"
                                            />
                                            <p className="text-center text-gray-400 mt-2">Click or drop photo to replace</p>
                                            <button
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                                                onClick={removePhoto}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Add Bio */}
                            <div className="mb-6 w-full">
                                <label className="block text-sm mb-2" htmlFor="location">
                                    Bio
                                </label>
                                <input
                                    style={{ letterSpacing: "1.5px" }}
                                    id="location"
                                    className="shad-input p-2"
                                    placeholder="Add a bio"
                                    value={bio}
                                    onChange={(e) => { setBio(e.target.value) }}
                                />
                            </div>
                            <div className='flex gap-4 items-center justify-end'>
                                <button
                                    type='submit'
                                    className='shad-button_primary p-3'
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProfile;
