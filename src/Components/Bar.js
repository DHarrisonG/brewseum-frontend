import React from 'react'
import Comments from './Comments'
import BarImage from './BarImage'
import { Button, Form, Grid, Image, Divider} from 'semantic-ui-react'


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
        this.setState({
            newComment: ''
        })
    }

    handleVisit = (e) => {
        console.log("button clicked")
        const loggedId = parseInt(localStorage.getItem('id'))
        fetch('http://localhost:3000/user_bars', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                  user_bar: {
                      user_id: loggedId,
                      bar_id: this.state.barId,
                    }
                })
        })
        .then(r => r.json())
        .then(r => {
            this.fetchBarInfo()
        })
    }

    render() {

        const nameStyle = {
            fontSize: '18px',
            fontFamily: "Tahoma, Geneva, sans-serif",
        }

        const pStyle = {
            fontSize: '18px',
            fontFamily: "Tahoma, Geneva, sans-serif",
        }
        
        const dStyle = {
            marginBottom: '45px'

        }

        const estStyle = {
            position: "absolute",
            right: "46%",
            top: 605,
            fontWeight: "bold"
        }


        return (
            <>
                <Grid textAlign={"center"}>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <BarImage image={this.state.image}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal><p style={nameStyle}>{this.state.name}</p></Divider>
                    <p style={estStyle}>Est. {this.state.opened}</p>
                    <Grid.Row columns={1}>
                        <Grid.Column width={12}>
                            <p style={pStyle}>{this.state.overview}</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal style={dStyle}><Button onClick={this.handleVisit} color='teal'>VISITED</Button></Divider>
                </Grid>

                <div class="comment-form">
                <Form>
                  <Form.TextArea onChange={this.handleChange} onfocus="this.value=''"/>
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