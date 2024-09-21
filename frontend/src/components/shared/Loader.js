import React from 'react'
import { loader } from '../../icons/iconsList';

const Loader = () => (
  <div className="flex-center w-full">
    <img
      src={loader}
      alt="loader"
      width={24}
      height={24}
      className="animate-spin"
    />
  </div>
);

export default Loader;
