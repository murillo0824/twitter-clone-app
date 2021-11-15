import React from 'react';
import { auth } from '../firebase'
import Tweetinput from './Tweetinput';
import styles from './Feed.module.css';


const Feed = () => {
  return (
    <div className={styles.feed}>
      FeeD
      <Tweetinput />
      <button onClick={()=> auth.signOut()}>logout</button>
    </div>
  )
}

export default Feed
