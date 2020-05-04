import React from 'react'
import Comments from './Comments'
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
        fetch(`http://localhost:3000/bars/${this.state.barId}`)
        .then(r => r.json())
        .then(bar => {
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
        fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  comments: {
                      user_id: 1,
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
                <div class="ui segment barImage">
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
                    fetchBarInfo={this.fetchBarInfo}
                    />
                )}
                </div>
            </>
        )
    }
}

export default Bar;