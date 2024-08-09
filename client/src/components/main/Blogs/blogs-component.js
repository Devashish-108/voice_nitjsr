import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import Rightbar from "./rightbar/Rightbar";
import UnderConstructionHeader from '../Under-construction/under-construction-header'
import "./blogsContainer.css"

export default function blogsComponent() {
  return (
    <>
      <UnderConstructionHeader />
      {/* <Topbar /> */}
      <div className="blogsContainer">
        {/* <Sidebar /> */}
        <Feed/>
        <Rightbar/>
      </div>
    </>
  )
}
