import React from 'react'
import Comments from './Comments'
import BarImage from './BarImage'
import { Button, Form } from 'semantic-ui-react'


class Bar extends React.Component {
    constructor() {
        super()

        this.state = {
            barId: parseInt(window.location.href.split("/").slice(-1)[0]),
            name: "",
            opened: "",
            overview: "",
            image: "",
            comments: [],
            newComment: ""
        }
    }



    componentDidMount() {
        this.fetchBarInfo()
    }

    fetchBarInfo = () => {
        fetch(`http://localhost:3000/bars/${this.state.barId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
        })
        .then(r => r.json())
        .then(bar => {
            console.log(bar)
            this.setState({
                name: bar.name,
                opened: bar.opened,
                overview: bar.overview,
                image: bar.image,
                comments: bar.comments.reverse()
            })
        })
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            newComment: e.target.value
        })
    }

    handleClick = (e) => {
        const loggedId = parseInt(localStorage.getItem('id'))
        fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                  comments: {
                      user_id: loggedId,
                      bar_id: this.state.barId,
                      comment: this.state.newComment
                    }
                })
        })
        .then(r => r.json())
        .then(r => {
            this.fetchBarInfo()
        })
    }

    render() {
        return (
            <>
                <div>
                    <BarImage image={this.state.image}/>
                </div>
                <div class="ui segment p">
                    <p>{this.state.overview}</p>
                </div>
                <div class="ui comments"></div>
                <div class="comment-form">
                <Form>
                  <Form.TextArea onChange={this.handleChange}/>
                  <Button
                    content='Add Comment'
                    labelPosition='left'
                    icon='edit'
                    primary
                    onClick={this.handleClick}
                  />
                </Form>
                </div>
                <div class="comments">
                {this.state.comments.map(comment =>
                    <Comments 
                    key={comment.id} 
                    commentId={comment.id}
                    comment={comment.comment} 
                    userId={comment.user_id}
                    fetchComments={this.fetchBarInfo}
                    />
                )}
                </div>
            </>
        )
    }
}

export default Bar;