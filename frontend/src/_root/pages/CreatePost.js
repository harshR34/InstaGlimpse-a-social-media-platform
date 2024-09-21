// import React from 'react';
// import { add_post } from '../../icons/iconsList';
// import PostForm from '../../components/forms/PostForm';
// const CreatePost = () => {
//   return (
//     <div className='flex flex-1 flex-col parent-container'>
//       <div className='common-container'>
//         <div className='max-w-5xl flex-start gap-3 justify-start w-full z-40 bg-black'>
//           <img
//             src={add_post}
//             width={36}
//             height={36}
//             alt='add_post'
//           />
//           <h2 className='h3-bold md:h2-bold text-left w-full' style={{letterSpacing:"1.5px"}}>Create Post</h2>
//         </div>
//         <PostForm/>
//       </div>
//     </div>
//   )
// }

// export default CreatePost


import React from 'react';
import { add_post } from '../../icons/iconsList';
import PostForm from '../../components/forms/PostForm';

const CreatePost = () => {
  return (
    <div className='flex flex-1 flex-col relative'>
      
      {/* Header: fixed/sticky at the top */}
      <div className='sticky top-0 z-50 bg-black w-full p-4'>
        <div className='flex items-center gap-3 mt-4'>
          <img
            src={add_post}
            width={36}
            height={36}
            alt='add_post'
          />
          <h2 className='text-2xl md:text-3xl font-bold text-left tracking-wide text-white'>
            Create Post
          </h2>
        </div>
      </div>

      {/* Scrollable PostForm below the fixed header */}
      <div className='flex-1 overflow-y-auto p-4'>
        <PostForm />
      </div>
      
    </div>
  );
};

export default CreatePost;
