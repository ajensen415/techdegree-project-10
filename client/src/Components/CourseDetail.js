import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Axios from 'axios';

// Displays individual course info
class CourseDetail extends Component {
    state = { 
        course: {},
        id: this.props.match.params.id,
        user: {}
    };

    componentDidMount() {
        this.getCourse();
    };

    // Retrieves course data from API
    getCourse = async function(id = this.props.match.params.id) {
        await Axios.get(`http://localhost:5000/api/courses/${id}`)
        .then( response => {
            this.setState({
                course: response.data.course,
                user: response.data.user,
            });
        });
    };

    render() {

        const { context } = this.props;
        const { course, id, user } = this.state;
        const { authenticatedUser } = context;

        return (
            <div>
              <div className="actions--bar">
                <div className="wrap">
                   {(
                     authenticatedUser && course.userId === authenticatedUser.userId
                   ) ? 
                   <React.Fragment>
                   <a className="button" href={`/courses/${id}/update`}>
                      Update Course
                    </a>
                    <a className="button" href={`/courses/${id}/delete`}>
                      Delete Course
                    </a>
                    <a className="button button-secondary" href="/">
                    Return to List
                  </a>
                    </React.Fragment> :
                    <a className="button button-secondary" href="/">
                    Return to List
                  </a>
                   } 
                </div>
              </div>
      
              <div className="wrap">
                <h2>Course Detail</h2>
                <div>
                  <form>
                    <div className="main--flex">
                      <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        {/* <p>{`By ${user.firstName} ${user.lastName}`}</p> */}
                        <p>{user ? ('By ' + user.firstName + ' ' + user.lastName) : null}</p>
                        <ReactMarkdown>{course.description}</ReactMarkdown>
                      </div>
                      <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{course.estimatedTime}</p>
      
                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
    };
};

export default CourseDetail;