import React from 'react'
import './globals.css';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import Home from './_root/pages/Home';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
// import Login from './_auth/forms/Login'
import ProtectedRoute from "./utils/ProtectedRoute"
import { AuthProvider } from './context/AuthContext'
import Saved from './_root/pages/Saved';
import Profile from './_root/pages/Profile';
import UpdateProfile from './_root/pages/UpdateProfile';
import Explore from './_root/pages/Explore';
import AllUsers from './_root/pages/AllUsers';
import CreatePost from './_root/pages/CreatePost';
import EditPost from './_root/pages/EditPost';
import PostDetails from './_root/pages/PostDetails';
import LikedPosts from './_root/pages/LikedPosts';
import CreateProfile from './_root/pages/CreateProfile';


const App = () => {
  return (<>
    <main className='flex h-screen'>
      {/* <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/" exact element={<Home1 />} />
        </Routes>
      </AuthProvider> */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/login" element={<SigninForm />} />
          </Route>
          {/* Private Routes*/}
          <Route element={<RootLayout />}>
            <Route index element={<Home />}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:id' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profile/>}/>
            <Route path='create-profile/' element={<CreateProfile/>}/>
            <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </main>
  </>
  )
}

export default App
