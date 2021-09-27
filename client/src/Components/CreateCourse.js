import React, { Component } from 'react';
import Form from './Form';

// Create course & add it to homepage index
class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
    user: this.props.context.authenticatedUser || null,
    userId: ""
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={this.change}
                    value={title}
                  />

                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={this.change}
                    value={description}
                  />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    onChange={this.change}
                    value={estimatedTime}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    onChange={this.change}
                    value={materialsNeeded}
                  />
                </div>
              </div>
            </React.Fragment>
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

  // Authenticate user
  submit = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const { title, description, estimatedTime, materialsNeeded} = this.state;
    const userId = authenticatedUser.id;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    
    // Catch errors 
    context.data
      .createCourse(
        course,
        authenticatedUser.emailAddress,
        authenticatedUser.password
      )
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(errors => console.log(errors));
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;