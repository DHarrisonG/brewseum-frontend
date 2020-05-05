import React from 'react'
import { Button, Comment, Form, Link } from 'semantic-ui-react'

class Comments extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            image: '',
            barName: '',
            commentId: this.props.commentId
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
            this.props.fetchBarInfo()
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
                <Comment.Text>{this.props.comment}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action onClick={this.handleCommentDelete}>Delete</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )
    }
}
    export default Comments;


