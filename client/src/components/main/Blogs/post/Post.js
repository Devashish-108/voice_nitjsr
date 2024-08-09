import "./post.css";
import { MdMoreVert } from "react-icons/md";
import { Users } from "../dummyData";
import { useState } from "react";

export default function Post({ post }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const [textValue, setTextValue] = useState((post?.desc && post?.desc.length>1000) ? "... More" : "")
  const [desc,setDesc] = useState((post?.desc && post?.desc.length>1000) ? post?.desc.substring(0, 1000) : post?.desc)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const descHandler =()=>{
    setDesc(textValue == " Less"? post?.desc.substring(0, 1000) : post?.desc)
    if(textValue==" Less") window.scrollBy(0, -1200);
    setTextValue(textValue == "... More" ? " Less" : "... More")
  }
  // var desc = post?.desc;
  // desc = (desc && desc.length>50)?desc.substring(0, 1000)+"...":desc;

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MdMoreVert />
          </div>
        </div>
        <div className="postCenter">
          <h4 className="postText">{post.title}</h4>
        </div>
        <img className="postImg" src={post.photo} alt="" />
        <div className="postCenter">
          <span className="postText">{desc}
            <a style={{color:"blue"}} onClick={descHandler}>{textValue}</a>
          </span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}