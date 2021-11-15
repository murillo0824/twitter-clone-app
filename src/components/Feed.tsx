import React from 'react';
import { auth } from '../firebase'
import Tweetinput from './Tweetinput';

const Feed = () => {
  return (
    <div>
      FeeD
      <Tweetinput />
      <button onClick={()=> auth.signOut()}>logout</button>
    </div>
  )
}

export default Feed
