import React, {Component} from 'react';
import Form from './Form';
import Axios from 'axios';

// Updates course info
export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
        user: {},
        id: this.props.match.params.id,
       };
       
       async componentDidMount() {
        await this.getCourse(this.state.id).catch(err => {
          console.log(err);
        });
      }
      
      // Retrieve course data via API
      getCourse = async function(id = this.props.match.params.id) {
        await Axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response => {
          this.setState({
            course: response.data.course,
            user: response.data.course.user,
            title: response.data.course.title,
            description: response.data.course.description,
            estimatedTime: response.data.course.estimatedTime,
            materialsNeeded: response.data.course.materialsNeeded
          });
        })
        .catch(err => {
          console.error(err);
          this.props.history.push("/notfound");
        });
        console.log(this.state.course);
      };


      render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
          } = this.state
    
      return(
        <div>
        <div className="wrap">
          <h1>Update {title}</h1>
            <Form 
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Update Course"
              elements={() => (
                <div> 
                  <React.Fragment>
                    <div className="main--flex">
                      <div>
                        <label>* Course Title</label>
                        <input 
                          id="title" 
                          name="title" 
                          type="text"
                          value={title} 
                          onChange={this.change} />
  
                        <label>Course Description</label>
                        <textarea 
                          id="description" 
                          name="description"
                          value={description} 
                          onChange={this.change}/>
                      </div>
                      <div>
                        <label>Estimated Time</label>
                        <input 
                          id="estimatedTime" 
                          name="estimatedTime"
                          type="text"
                          value={estimatedTime || ''} 
                          onChange={this.change}/>  
  
                        <label>Materials Needed</label>
                        <textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          value={materialsNeeded || ''} 
                          onChange={this.change}/> 
                      </div>
                    </div>             
                    </React.Fragment>
                </div>
              )} />
        </div> 
      </div>
    )  
}

change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState( () => {
        return{
            [ name ]: value
        }
    })
}
// Authenticates user
submit = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const userId = authenticatedUser.userId;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id
    } = this.state;
    
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
}
    context.data.updateCourse(
        id,
        course,
        authenticatedUser.emailAddress,
        authenticatedUser.password
    )
    .then(errors => {
        if (errors.length) {
            this.setState({errors});
        } else {
            this.props.history.push(`/courses/${id}`);
        }
    })
    }

    cancel = () => {
        this.props.history.push(`/courses/${this.state.id}`);
    }
}