import React from 'react';
import { auth } from '../firebase'

const Feed = () => {
  return (
    <div>
      FeeD
      <button onClick={()=> auth.signOut()}>logout</button>
    </div>
  )
}

export default Feed
