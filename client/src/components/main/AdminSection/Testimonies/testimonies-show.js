import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import DataTable from "react-data-table-component";
// import UserDetails from "./user-details/user-details";
import { fetchTestimonies } from "./testimonies-action";
import history from "../../../history";
class TestimoniesList extends React.Component {

  state = {testimonyToEdit: null}

  handleEdit(testimony) {
    console.log("testimony: ", testimony)
    this.setState({
      testimonyToEdit: testimony
    })
  }

  componentDidMount() {
    this.props.fetchTestimoniesAction({});
  }

  render() {
    if (!this.props.user || this.props.user.userType !== "admin") {
      history.push("/");
      return <> </>;
    }

    const testimoniesJSX = Object.keys(this.props.testimoniesList).map((k) => {
      var e = this.props.testimoniesList[k];
      return <div className="testimonies-card">
        {/* {console.log("e: ", e)} */}
        <div style={{width:"10vw"}}>
          <b>{Number(k)+1}. </b> 
          {e.name}
        </div>
        <div style={{width:"20vw"}}>{e.alumnus}</div>
        <div style={{width:"20vw"}}>{e.work}</div>
        <div>{e.isVerified.toString()}</div>

        <button onClick={this.handleEdit.bind(this, e)} style={{fontSize: "smaller", textDecoration: "underline", position: "relative", bottom: "-15px", color: "blue"}}>Edit</button>
      </div>;
    });

    return (
      <div className="testimonies-show-container">
        <div className="testimonies-card list-heading">
          <div>Name</div>
          <div>Alumnus</div>
          <div>Work</div>
          <div>IsVerified</div>
        </div>
          
          {testimoniesJSX}
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    testimoniesList: state.testimoniesSection.testimonies,
    user: state.profileSection.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTestimoniesAction: bindActionCreators(fetchTestimonies, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestimoniesList);
