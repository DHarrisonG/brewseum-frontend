import React from 'react'
import { Button, Comment, Form, Link } from 'semantic-ui-react'

class Comments extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            image: '',
            barName: '',
            commentId: this.props.commentId,
            editStatus: false,
            editId: '',
            commentEdit: this.props.comment
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        .then(r => r.json())
        .then(user => {
            this.setState({
                username: user.username,
                image: user.image,
            })
        })

        fetch(`http://localhost:3000/bars/${this.props.barId}`)
        .then( r => r.json())
        .then(bar => {

            this.setState({
                barName: bar.name
            })
        })
    }

    handleCommentDelete = (e) => {
        console.log(this.state.commentId)
        fetch(`http://localhost:3000/comments/${this.state.commentId}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(r => {
            this.props.fetchComments()
        })
    }

    handleCommentEdit = () => {
        this.setState({
            editStatus: true,
            editId: this.state.commentId
        })
    }

    handleCommentChange = (e) => {
        console.log(e.target.value)
        this.setState({
            commentEdit: e.target.value
        })
    }

    handleCommentPatch = (e) => {
        console.log(e.target.comment.value)
        console.log(this.state.commentId)
        fetch(`http://localhost:3000/comments/${this.state.commentId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                    comment: e.target.comment.value
            })
        })
        .then(r => r.json())
        .then(r => {
            this.props.fetchComments()
        })
        this.setState({
            editStatus: false
        })
    }

    render() {
        return (
            <Comment.Group>
            <Comment>
              <Comment.Avatar as='a' src={this.state.image} />
              <Comment.Content>
                <Comment.Author as='a'><a href={`/user/${this.props.userId}`}>{this.state.username}</a></Comment.Author>
                <Comment.Metadata>
                    <div><a href={`/bars/${this.props.barId}`}>{this.state.barName}</a></div>
                </Comment.Metadata>
                {this.state.commentId === this.state.editId && this.state.editStatus ?
                                <Form onSubmit={this.handleCommentPatch}>
                                <Form.TextArea value={this.state.commentEdit} onChange={this.handleCommentChange} name="comment"/>
                                <Form.Button
                                  content='Edit Comment'
                                  labelPosition='right'
                                  icon='edit'
                                  primary
                                />
                              </Form> :  <Comment.Text>{this.props.comment}</Comment.Text>}
               
                <Comment.Actions>
                    {this.props.userId === parseInt(localStorage.getItem('id')) ? <Comment.Action onClick={this.handleCommentDelete}>Delete</Comment.Action> : null}
                    {this.props.userId === parseInt(localStorage.getItem('id')) ? <Comment.Action onClick={this.handleCommentEdit}>Edit</Comment.Action> : null}    
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )
    }
}
    export default Comments;