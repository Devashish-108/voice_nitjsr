import Post from "../post/Post";
import Share from "../share/Share";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./feed.css";

import { useEffect } from "react";
import { getAllBlogs } from "../blogsActions"

function Feed(props) {

  useEffect(()=> {
    props.getAllBlogs();
  },[])


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
         {props.blogs.length === 0 && <h1>No Blogs Found</h1>}
        {Object.values(props.blogs).map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogsSection.blogs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: bindActionCreators(getAllBlogs, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Feed);