import React from 'react'
import { Button, Form, Grid, TextArea, Message, Header, Image, Segment } from 'semantic-ui-react'



class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            password_confirmation: "",
            image: "",
            about: ""
        }

    }

    handleChange = (e) => {
        console.log(`${e.target.name}: ${e.target.value}`)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.target.reset()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                users: {
                    username: this.state.username,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation,
                    image: this.state.image,
                    about: this.state.about
                }
            })
        })
            .then(r => r.json())
            .then(response => {
                console.log(response)
                console.log("---------",this.state,"---------")
                fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        'Authorization': `JWT ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        user: {
                        username: this.state.username,
                        password: this.state.password
                        }
                    })
                })
                    .then(r => r.json())
                    .then(response => {
                        console.log(response)
                        localStorage.setItem("token", response.jwt)
                        // let decoded = jwt.decode(response.jwt, "put your env here");
                        localStorage.setItem("id", response.user.id)
                        this.props.history.push(`/user/${response.user.id}`)
                        this.props.handleLogin(true, response.user.id)
                    })
            })
        // this.setState({
        //     username: "",
        //     password: "",
        //     password_confirmation: "",
        //     image: "",
        //     about: ""
        // })

    }

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/beers/beer5.svg' /> Welcome to Brewseum!
            </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                name="username"
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm Password'
                                type='password'
                                name='password_confirmation'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon='camera'
                                iconPosition='left'
                                placeholder='Profile Pic'
                                type='url'
                                name='image'
                                onChange={this.handleChange}
                            />
                            <Form.TextArea
                                fluid
                                icon='beer'
                                iconPosition='left'
                                rows={2} placeholder='Tell us about yourself'
                                type='text-field'
                                name='about'
                                onChange={this.handleChange}
                            />
                            <Form.Button color='blue' fluid size='large' content="Submit">
                                Sign-up
                            </Form.Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already a member? <a href='/login'>Log-in</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Signup; 