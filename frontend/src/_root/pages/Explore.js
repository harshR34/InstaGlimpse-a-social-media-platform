import React, { useState } from 'react'
import { search,filter } from '../../icons/iconsList';
import GridPostList from '../../components/shared/GridPostList';
const Explore = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Post</h2>
        <div className='flex gap-1 w-full rounded-lg bg-dark-4'>
          <img
            src={search}
            alt='search'
            width={24}
            height={24}
            className='m-2'
          />
          <input
            type='text'
            placeholder='Search'
            className='explore-search w-full p-2'
            value={searchValue}
            onChange={(e) => { setSearchValue(e.target.value) }}
          />
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold' style={{letterSpacing:'1.5px'}}>Popular Today</h3>
        

        <div className='flex-center gap-3 bg-dark rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>

          <img
            src={filter}
            alt='filter'
            width={20}
            height={20}
          />
        </div>
      </div>
      
      <GridPostList/>
    </div>
  )
}

export default Explore