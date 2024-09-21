// import React, { useState, useContext } from 'react';
// import { file_upload } from '../../icons/iconsList'; // Ensure your icon imports are correct
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const swal = require('sweetalert2')

// const PostForm = () => {

//     const [caption, setCaption] = useState('');
//     const [photo, setPhoto] = useState(null); // Only allow one photo
//     const [location, setLocation] = useState('');
//     const [tags, setTags] = useState('');
//     const [isDragOver, setIsDragOver] = useState(false);

//     const token = localStorage.getItem('authTokens');
//     const decode = jwtDecode(token);
//     const username = decode.username;

//     const navigate = useNavigate();

//     const handlePosting = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('caption', caption);
//         formData.append('location', location);
//         formData.append('tags', tags);

//         // Ensure the file exists before appending
//         if (photo?.file) {
//             formData.append('post', photo.file); // Append the image file to the FormData
//         }

//         axios.post('http://127.0.0.1:8000/api/addpost/', formData)
//             .then((res) => {
//                 console.log('Data uploaded successfully');
//                 setCaption('');
//                 setLocation('');
//                 setTags('');
//                 setPhoto(null);
//                 setIsDragOver(false);
//                 navigate('/');
//                 if (res.status === 201) {
//                     navigate('/')
//                     swal.fire({
//                         title: "Post Created",
//                         icon: "success",
//                         toast: true,
//                         timer: 6000,
//                         position: 'top-right',
//                         timerProgressBar: true,
//                         showConfirmButton: false
//                     })
//                 } else {
//                     console.log(res.status)
//                     console.log("An Error Occured")
//                     swal.fire({
//                         title: "There was a server error during creating a post",
//                         icon: "error",
//                         toast: true,
//                         timer: 6000,
//                         position: 'top-right',
//                         timerProgressBar: true,
//                         showConfirmButton: false
//                     })
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error uploading data:', error.response.data);
//             });
//     };

//     // Handle file upload (only one photo)
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
//         <div className="flex justify-center items-center bg-black min-h-screen">
//             <div className="w-full max-w-3xl text-white p-6 rounded-lg">
//                 <form className='flex flex-col gap-9 w-full max-w-5xl' onSubmit={handlePosting}>
//                     {/* Caption */}
//                     <div className="mb-6 w-full flex flex-col">
//                         <label className="shad-form_label" htmlFor="caption">
//                             Caption
//                         </label>
//                         <textarea
//                             id="caption"
//                             className="shad-textarea custom-scrollbar p-3"
//                             placeholder="Write a caption..."
//                             value={caption}
//                             onChange={(e) => setCaption(e.target.value)}
//                         ></textarea>
//                     </div>

//                     {/* Add Photos */}
//                     <div className="mb-6 w-full">
//                         <label className="shad-form_label">Add Photo</label>
//                         <div
//                             className={`border-2 ${isDragOver ? 'border-blue-500' : 'border-dashed border-gray-500'} 
//               rounded-lg p-6 flex flex-col items-center justify-center relative w-full`}
//                             onDragOver={(e) => {
//                                 e.preventDefault();
//                                 setIsDragOver(true);
//                             }}
//                             onDragLeave={() => setIsDragOver(false)}
//                             onDrop={handleDrop}
//                         >
//                             {!photo ? (
//                                 <>
//                                     <img src={file_upload} alt="file upload" className="h-16 w-16 text-gray-500 mb-4" />
//                                     <p className="text-gray-400 mb-4">Click or drag to upload a photo</p>
//                                     <p className="text-gray-400 text-xs">SVG, PNG, JPG</p>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                                         onChange={handleFileUpload}
//                                     />
//                                 </>
//                             ) : (
//                                 <div className="w-full relative">
//                                     <img
//                                         src={photo.url}
//                                         alt="uploaded"
//                                         className="w-full h-auto object-cover rounded-lg"
//                                     />
//                                     <p className="text-center text-gray-400 mt-2">Click or drop photo to replace</p>
//                                     <button
//                                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
//                                         onClick={removePhoto}
//                                     >
//                                         &times;
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Add Location */}
//                     <div className="mb-6 w-full">
//                         <label className="block text-sm mb-2" htmlFor="location">
//                             Add Location
//                         </label>
//                         <input
//                             id="location"
//                             className="shad-input p-2"
//                             placeholder="Add a location"
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}
//                         />
//                     </div>

//                     {/* Add Location */}
//                     <div className="mb-6 flex flex-col">
//                         <label className="shad-form_label" htmlFor="location">
//                             Add tags
//                         </label>
//                         <input
//                             id="tags"
//                             className="shad-input p-2"
//                             placeholder="JS,React,NextJs"
//                             value={tags}
//                             onChange={(e) => setTags(e.target.value)}
//                         />
//                     </div>

//                     <div className='flex gap-4 items-center justify-end'>
//                         <button
//                             type='button'
//                             className='shad-button_dark_4 '
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type='submit'
//                             className='shad-button_primary p-3'
//                         >
//                             Post
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default PostForm;

// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { file_upload } from '../../icons/iconsList'; // Ensure your icon imports are correct
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const swal = require('sweetalert2');

// const PostForm = () => {
//     const [caption, setCaption] = useState('');
//     const [photo, setPhoto] = useState(null); // Only allow one photo
//     const [location, setLocation] = useState('');
//     const [tags, setTags] = useState('');
//     const [isDragOver, setIsDragOver] = useState(false);
//     const locationInputRef = useRef(null);  // Ref for location input

//     const token = localStorage.getItem('authTokens');
//     const decode = jwtDecode(token);
//     // const username = decode.username;

//     const [profiles, setProfiles] = useState([]);

//     const fetchProfile = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/user-profile-list/');
//             setProfiles(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
    

//     const profile = profiles.filter(pro=>pro.username===decode.username)
//     console.log(profile)
//     const username = JSON.stringify(profile.username);
//     console.log(username)

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (window.google) {
//             const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, {
//                 types: ['geocode'] // Removes country restriction, allows global places
//             });

//             // Listener when a place is selected
//             autocomplete.addListener('place_changed', () => {
//                 const place = autocomplete.getPlace();
//                 if (place.formatted_address) {
//                     setLocation(place.formatted_address);
//                 } else if (place.name) {
//                     setLocation(place.name);
//                 }
//             });
//         }
//         fetchProfile();
//     }, []);


//     const handlePosting = (e) => {
//         e.preventDefault();
//         const created_at = new Date();
//         const formattedDateTime = created_at.toLocaleString();  // Local time and date

//         const formData = new FormData();
//         formData.append('username', profile.username);
//         formData.append('caption', caption);
//         formData.append('location', location);
//         formData.append('tags', tags);
//         formData.append('created_at', formattedDateTime);
//         formData.append('likes', 0);

//         // Ensure the file exists before appending
//         if (photo?.file) {
//             formData.append('post', photo.file); // Append the image file to the FormData
//         }

//         axios.post('http://127.0.0.1:8000/api/addpost/', formData)
//             .then((res) => {
//                 console.log('Data uploaded successfully');
//                 setCaption('');
//                 setLocation('');
//                 setTags('');
//                 setPhoto(null);
//                 setIsDragOver(false);
//                 navigate('/');
//                 if (res.status === 201) {
//                     swal.fire({
//                         title: "Post Created",
//                         icon: "success",
//                         toast: true,
//                         timer: 6000,
//                         position: 'top-right',
//                         timerProgressBar: true,
//                         showConfirmButton: false
//                     });
//                 } else {
//                     console.log(res.status);
//                     console.log("An Error Occured");
//                     swal.fire({
//                         title: "There was a server error during creating a post",
//                         icon: "error",
//                         toast: true,
//                         timer: 6000,
//                         position: 'top-right',
//                         timerProgressBar: true,
//                         showConfirmButton: false
//                     });
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error uploading data:', error.response.data);
//             });
//     };

//     // Handle file upload (only one photo)
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
//         <div className="flex justify-center items-center bg-black min-h-screen">
//             <div className="w-full max-w-3xl text-white p-6 rounded-lg">
//                 <form className='flex flex-col gap-9 w-full max-w-5xl' onSubmit={handlePosting}>
//                     {/* Caption */}
//                     <div className="mb-6 w-full flex flex-col">
//                         <label className="shad-form_label" htmlFor="caption">
//                             Caption
//                         </label>
//                         <textarea
//                             style={{ letterSpacing: "1.5px" }}
//                             id="caption"
//                             className="shad-textarea custom-scrollbar p-3"
//                             placeholder="Write a caption..."
//                             value={caption}
//                             onChange={(e) => setCaption(e.target.value)}
//                         ></textarea>
//                     </div>

//                     {/* Add Photos */}
//                     <div className="mb-6 w-full">
//                         <label className="shad-form_label">Add Photo</label>
//                         <div
//                             className={`border-2 ${isDragOver ? 'border-blue-500' : 'border-dashed border-gray-500'} 
//               rounded-lg p-6 flex flex-col items-center justify-center relative w-full`}
//                             onDragOver={(e) => {
//                                 e.preventDefault();
//                                 setIsDragOver(true);
//                             }}
//                             onDragLeave={() => setIsDragOver(false)}
//                             onDrop={handleDrop}
//                         >
//                             {!photo ? (
//                                 <>
//                                     <img src={file_upload} alt="file upload" className="h-16 w-16 text-gray-500 mb-4" />
//                                     <p className="text-gray-400 mb-4">Click or drag to upload a photo</p>
//                                     <p className="text-gray-400 text-xs">SVG, PNG, JPG</p>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                                         onChange={handleFileUpload}
//                                     />
//                                 </>
//                             ) : (
//                                 <div className="w-full relative">
//                                     <img
//                                         src={photo.url}
//                                         alt="uploaded"
//                                         className="w-full h-auto object-cover rounded-lg"
//                                     />
//                                     <p className="text-center text-gray-400 mt-2">Click or drop photo to replace</p>
//                                     <button
//                                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
//                                         onClick={removePhoto}
//                                     >
//                                         &times;
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Add Location */}
//                     <div className="mb-6 w-full">
//                         <label className="block text-sm mb-2" htmlFor="location">
//                             Add Location
//                         </label>
//                         <input
//                             style={{ letterSpacing: "1.5px" }}
//                             id="location"
//                             ref={locationInputRef}  // Reference for location input
//                             className="shad-input p-2"
//                             placeholder="Add a location"
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}  // Manually setting value in case user types manually
//                         />
//                     </div>

//                     {/* Add Tags */}
//                     <div className="mb-6 flex flex-col">
//                         <label className="shad-form_label" htmlFor="tags">
//                             Add tags
//                         </label>
//                         <input
//                             style={{ letterSpacing: "1.5px" }}
//                             id="tags"
//                             className="shad-input p-2"
//                             placeholder="JS,React,NextJs"
//                             value={tags}
//                             onChange={(e) => setTags(e.target.value)}
//                         />
//                     </div>

//                     <div className='flex gap-4 items-center justify-end'>
//                         <button
//                             type='button'
//                             className='shad-button_dark_4 '
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type='submit'
//                             className='shad-button_primary p-3'
//                         >
//                             Post
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default PostForm;

import React, { useState, useEffect, useRef } from 'react';
import { file_upload } from '../../icons/iconsList'; // Ensure your icon imports are correct
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const swal = require('sweetalert2');

const PostForm = () => {
    const [caption, setCaption] = useState('');
    const [photo, setPhoto] = useState(null); // Only allow one photo
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const locationInputRef = useRef(null);  // Ref for location input

    const token = localStorage.getItem('authTokens');
    const decode = jwtDecode(token);
    const username = decode.username; // Directly get username from token

    const [profiles, setProfiles] = useState([]);
    const [profile, setProfile] = useState(null); // Store the user's profile

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user-profile-list/');
            setProfiles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        // Find the profile of the currently logged-in user
        const userProfile = profiles.find(pro => pro.username === username);
        setProfile(userProfile);
    }, [profiles, username]);

    const navigate = useNavigate();

    const handlePosting = (e) => {
        e.preventDefault();
        const created_at = new Date();
        const formattedDateTime = created_at.toLocaleString();  // Local time and date

        const formData = new FormData();
        if (profile) {
            formData.append('username', profile.username);
        } else {
            console.error("User profile is not found.");
            return; // Do not proceed if profile is not found
        }
        formData.append('caption', caption);
        formData.append('location', location);
        formData.append('tags', tags);
        formData.append('created_at', formattedDateTime);
        formData.append('likes', 0);

        // Ensure the file exists before appending
        if (photo?.file) {
            formData.append('post', photo.file); // Append the image file to the FormData
        }

        axios.post('http://127.0.0.1:8000/api/addpost/', formData)
            .then((res) => {
                console.log('Data uploaded successfully');
                setCaption('');
                setLocation('');
                setTags('');
                setPhoto(null);
                setIsDragOver(false);
                navigate('/');
                if (res.status === 201) {
                    swal.fire({
                        title: "Post Created",
                        icon: "success",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } else {
                    console.log(res.status);
                    console.log("An Error Occurred");
                    swal.fire({
                        title: "There was a server error during creating a post",
                        icon: "error",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
            })
            .catch((error) => {
                console.error('Error uploading data:', error.response.data);
            });
    };

    // Handle file upload (only one photo)
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
        <div className="flex justify-center items-center bg-black min-h-screen">
            <div className="w-full max-w-3xl text-white p-6 rounded-lg">
                <form className='flex flex-col gap-9 w-full max-w-5xl' onSubmit={handlePosting}>
                    {/* Caption */}
                    <div className="mb-6 w-full flex flex-col">
                        <label className="shad-form_label" htmlFor="caption">
                            Caption
                        </label>
                        <textarea
                            style={{ letterSpacing: "1.5px" }}
                            id="caption"
                            className="shad-textarea custom-scrollbar p-3"
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Add Photos */}
                    <div className="mb-6 w-full">
                        <label className="shad-form_label">Add Photo</label>
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

                    {/* Add Location */}
                    <div className="mb-6 w-full">
                        <label className="block text-sm mb-2" htmlFor="location">
                            Add Location
                        </label>
                        <input
                            style={{ letterSpacing: "1.5px" }}
                            id="location"
                            ref={locationInputRef}  // Reference for location input
                            className="shad-input p-2"
                            placeholder="Add a location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}  // Manually setting value in case user types manually
                        />
                    </div>

                    {/* Add Tags */}
                    <div className="mb-6 flex flex-col">
                        <label className="shad-form_label" htmlFor="tags">
                            Add tags
                        </label>
                        <input
                            style={{ letterSpacing: "1.5px" }}
                            id="tags"
                            className="shad-input p-2"
                            placeholder="JS,React,NextJs"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className='flex gap-4 items-center justify-end'>
                        <button
                            type='button'
                            className='shad-button_dark_4 '
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className='shad-button_primary p-3'
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
