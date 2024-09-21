import React from 'react'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import logo from '../../images/Insta1.png';


const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-dark-1 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="sm:w-420 flex-center flex-col">
            <img src={logo} alt='logo'></img>
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
              Login to your account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              To use InstaGlimpse, Please enter your details
            </p>
          </div>

          <form onSubmit={handleLogin} className='pt-4'>

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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link to='/sign-up' className="text-indigo-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SigninForm
