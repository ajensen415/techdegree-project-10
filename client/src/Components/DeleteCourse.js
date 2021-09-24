import React, { Component } from "react";
import Form from "./Form";
import ReactMarkdown from "react-markdown";
import Axios from 'axios';

//This component allows authenticated users to delete a course
export default class DeleteCourse extends Component {
  state = {
    owner: {},
    errors: [],
    user: this.props.context.authenticatedUser || null,
    id: this.props.match.params.id,
    course: {}
  };

  async componentDidMount() {
    await this.getCourse(this.state.id).catch(err => {
      console.log(err);
    });
  }
  
  // Pulls data from API
  getCourse = async function(id) {
    await Axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          course: response.data,
          owner: response.data.owner
        });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/notfound");
      });
  };

  render() {
    const { course, owner, errors } = this.state;
    return (
      <div className="wrap">
        <h3>Delete Course: {course.title}?</h3>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Delete Course"
          elements={() => (
            <div className="main--flex">
              <React.Fragment>
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  {/* <p>{`By ${owner.firstName} ${owner.lastName}`}</p> */}
                  <p>{course.user ? ('By ' + course.user.firstName + ' ' + course.user.lastName) : null}</p>
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
              </React.Fragment>
              <React.Fragment>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </div>
              </React.Fragment>
            </div>
          )}
        />
      </div>
    );
  }

  change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const { id } = this.state;

    context.data
      .deleteCourse(
        id,
        authenticatedUser.emailAddress,
        authenticatedUser.password
      )
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("course deleted");
          this.props.history.push("/");
        }
      });
  };

  cancel = () => {
    const { id } = this.state;
    this.props.history.push(`/courses/${id}`);
  };
}