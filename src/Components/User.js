import React from 'react'
import { Grid, Image, Card, Divider, Icon, Modal, Button, Form, Segment} from 'semantic-ui-react'
import Comments from './Comments'
import Badge from './Badge'

class User extends React.Component {
    constructor() {
        super()

        this.state = {
            userId: '',
            username: '',
            image: '',
            about: '',
            comments: [],
            bars: [],
            loggedIn: false,
            open: false,
            newImage: '',
            newAbout: ''
            
        }
    }


    componentDidMount() {
        this.fetchUser()
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    fetchUser = () => {
        const urlInput = parseInt(window.location.href.split("/").slice(-1)[0])
        fetch(`http://localhost:3000/users/${urlInput}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(r => r.json())
            .then(user => {
                console.log(user)
                let duplicatedArray = user.bars
                let uniqueArray = new Set(duplicatedArray)
                console.log(uniqueArray)
                this.setState({
                    userId: user.id,
                    username: user.username,
                    image: user.image,
                    about: user.about,
                    comments: user.comments,
                    bars: user.bars
                    // joined: user.created_at

                })
            })
    }

    handleUserChange = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUserPatch = (e) => {
        fetch(`http://localhost:3000/users/${this.state.userId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                        image: this.state.newImage,
                        about: this.state.newAbout
            })
        })
        .then(r => r.json())
        .then(r => {
            this.fetchUser()
        })
        this.close()
    }

    handleUserDelete = (e) => {
        fetch(`http://localhost:3000/users/${this.state.userId}`, {
            method: 'DELETE'
        })
        // .then(r => r.json())
        // .then(r => {
        //     this.props.fetchComments()
        // })
        this.props.handleLogout()
        this.props.history.push("/")
    }

    render() {

        const pStyle = {
            fontSize: '1.5em',
        };

        const dStyle = {
            position: "absolute",
            left: "1px"
        }

        const { open, dimmer } = this.state

        return (
            <>
                <Grid centered="true">
                    {this.state.userId === parseInt(localStorage.getItem('id')) ? <Icon class="userEditIcon" name='edit' size="big" onClick={this.show('blurring')}/> : null}
                    
                    <Grid.Column width={4}>
                        <Card>
                            <Image src={this.state.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{this.state.username}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined: {this.state.joined}</span>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={9} verticalAlign="middle">
                        <p style={pStyle}>{this.state.about}</p>
                    </Grid.Column>
                </Grid>
                <Divider horizontal>Badges</Divider>
                <Grid columns={5} textAlign={"center"}>
                    {this.state.bars.map(bar =>
                        <Grid.Column>
                            <Badge
                                key={bar.id}
                                barImage={bar.image}
                            />
                        </Grid.Column>
                    )}
                </Grid>
                <Divider horizontal>Comments</Divider>
                <div class="comments">
                    {this.state.comments.map(comment =>
                        <Comments
                            key={comment.id}
                            userId={comment.user_id}
                            commentId={comment.id}
                            barId={comment.bar_id}
                            comment={comment.comment}
                            fetchComments={this.fetchUser}
                        />
                    )}
                </div>

                <div>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Edit Details</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='camera'
                                iconPosition='left'
                                placeholder='Profile Pic'
                                type='url'
                                name='newImage'
                                onChange={this.handleUserChange}
                            />
                            <Form.TextArea
                                fluid
                                icon='beer'
                                iconPosition='left'
                                rows={2} placeholder='Tell us about yourself'
                                type='text-field'
                                name='newAbout'
                                onChange={this.handleUserChange}
                            />
                        </Segment>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button color='red' style={dStyle} onClick={this.handleUserDelete}>
                    DELETE
                    </Button>
                    <Button color='black' onClick={this.close}>
                    Nevermind
                    </Button>
                    <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Change it"
                    onClick={this.handleUserPatch}
                    />
                </Modal.Actions>
                </Modal>
            </div>


            </>
        )
    }
}

export default User;