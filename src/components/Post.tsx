import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import MessageIcon from "@material-ui/icons/Message";

interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

interface COMMENT {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: any;
}

const Post: React.FC<PROPS> = (props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<COMMENT[]>([
    {
      id: "",
      avatar: "",
      text: "",
      username: "",
      timestamp: null,
    },
  ]);
  const [openComments, setOpenComments] = useState(false);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((sanapshot) => {
        setComments(
          sanapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [props.postId]);

  const user = useSelector(selectUser);
  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").doc(props.postId).collection("comments").add({
      avatar: user.photoUrl,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_avater}>
        <Avatar src={props.avatar} />
      </div>
      <div className={styles.post_body}>
        <div>
          <div className={styles.post_header}>
            <h3>
              <span className={styles.post_headerUser}>@{props.username}</span>
              <span className={styles.post_headerTime}>
                {/*props.timestamp*/}
                {props.timestamp &&
                  new Date(props.timestamp.toDate()).toLocaleString()}
                {/* {timestamp は後から取得する値なので、＆＆である場合に使用するという方法をとらないとエラーが発生する} */}
              </span>
            </h3>
          </div>
          <div className={styles.post_tweet}>
            <p>{props.text}</p>
          </div>
        </div>
        {props.image && (
          <div className={styles.post_tweetImage}>
            <img src={props.image} alt="tweet image" />
          </div>
        )}
        <MessageIcon
          className={styles.post_commentIcon}
          onClick={() => setOpenComments(!openComments)}
        />
        {openComments && (<>
          {comments.map((com) => (
            <div key={com.id} className={styles.post_comment}>
              <Avatar src={com.avatar} style={{ width: 24, height: 24 }} />
              <span className={styles.post_commentUser}>@{com.username}</span>
              <span className={styles.post_commentText}>{com.text}</span>
              <span className={styles.post_headerTime}>
                {com.timestamp &&
                  new Date(com.timestamp?.toDate()).toLocaleDateString()}
              </span>
            </div>
          ))}

          {/* mapを使用して、何かをレンダリングする際は　アロー関数の矢印の先は、{} ではなく　()にする。 */}

          <form onSubmit={newComment}>
            <div className={styles.post_form}>
              <input
                className={styles.post_input}
                type="text"
                placeholder="Type new comment..."
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
              />
              <button
                type="submit"
                className={
                  comment ? styles.post_button : styles.post_buttonDisable
                }
                disabled={!comment}
              >
                <SendIcon className={styles.post_sendIcon} />
              </button>
            </div>
          </form>
        </>)}
        
      </div>
    </div>
  );
};

export default Post;
