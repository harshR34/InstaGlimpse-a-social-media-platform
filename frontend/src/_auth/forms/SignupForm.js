// import React, { useState, useContext } from 'react'
// import { Link } from 'react-router-dom'
// import AuthContext from "../../context/AuthContext"
// import logo from '../../images/Insta1.png';

// const SignupForm = () => {
//   const [full_name, setFull_name] = useState("")
//   const [email, setEmail] = useState("")
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")

//   const { registerUser } = useContext(AuthContext)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log(full_name)
//     console.log(email)
//     console.log(username)

//     registerUser(full_name, email, username, password, password2)
//   }

// return (
//   <div className="min-h-screen flex items-center justify-center bg-black text-white">
//     <div className="bg-dark-1 p-8 rounded-lg shadow-lg w-full max-w-md">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold"><img src={logo} alt='logo'></img></h1>
//         <p className="text-gray-400">Create a new account</p>
//         <p className="text-sm text-gray-500 mt-2">To use Snapgram, please enter your details</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-300">Name</label>
//           <input
//             type="text"
//             className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e)=>{setFull_name(e.target.value)}}
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-300">Username</label>
//           <input
//             type="text"
//             className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e)=>{setUsername(e.target.value)}}
//             />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-300">Email</label>
//           <input
//             type="email"
//             className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e)=>{setEmail(e.target.value)}}
//             />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-300">Password</label>
//           <input
//             type="password"
//             className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e)=>{setPassword(e.target.value)}}
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
//           <input
//             type="password"
//             className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e)=>{setPassword2(e.target.value)}}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
//         >
//           Sign Up
//         </button>
//       </form>

//       <p className="mt-6 text-center text-sm text-gray-500">
//         Already have an account? <Link to='/login' className="text-indigo-500 hover:underline">Log in</Link>
//       </p>
//     </div>
//   </div>
// )
// }

// export default SignupForm
// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import AuthContext from "../../context/AuthContext";
// import logo from '../../images/Insta1.png';
// import signupImage from '../../images/side-img.svg'; // Update the path as needed

// const SignupForm = () => {
//   const [full_name, setFull_name] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   const { registerUser } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(full_name);
//     console.log(email);
//     console.log(username);

//     registerUser(full_name, email, username, password, password2);
//   };

//   return (
//     <>
//       <div className="flex flex-col md:flex-row min-h-screen">
//         {/* Left Section: Form */}
//         <div className="flex flex-col justify-center w-full md:w-1/2 bg-black text-white p-8">
//           <div className="max-w-md mx-auto">
//             <div className="text-center mb-8">
//               <img src={logo} alt="logo" className="mx-auto" />
//               <h1 className="text-3xl font-bold mt-4">Create a new Account</h1>
//               <p className="text-gray-400 mt-2">To use InstaGlimpse, please enter your details</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-300">Name</label>
//                 <input
//                   type="text"
//                   className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setFull_name(e.target.value)}
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-300">Username</label>
//                 <input
//                   type="text"
//                   className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-300">Password</label>
//                 <input
//                   type="password"
//                   className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
//                 <input
//                   type="password"
//                   className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onChange={(e) => setPassword2(e.target.value)}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
//               >
//                 Sign Up
//               </button>
//             </form>

//             <p className="mt-6 text-center text-sm text-gray-500">
//               Already have an account? <Link to='/login' className="text-indigo-500 hover:underline">Log in</Link>
//             </p>
//           </div>
//         </div>

//         {/* Right Section: Image */}
//         <div className="w-full md:w-1/2 h-full hidden md:block">
//           <img src={signupImage} alt="Signup" className="w-full h-full object-cover" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignupForm;

import React from 'react'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import logo from '../../images/Insta1.png';


const SignupForm = () => {
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(full_name);
    console.log(email);
    console.log(username);

    registerUser(full_name, email, username, password, password2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-dark-1 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="sm:w-420 flex-center flex-col">
          <img src={logo} alt='logo'></img>
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use InstaGlimpse, Please enter your details
        </p>
        </div>

        <form onSubmit={handleSubmit} className='pt-4'>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setFull_name(e.target.value) }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setPassword2(e.target.value) }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to='/login' className="text-indigo-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm
