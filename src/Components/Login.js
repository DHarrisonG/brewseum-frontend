import React from 'react'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import jwt from 'jwt-simple'

class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            currentUser: "",
            currentUserId: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()

        const {username, password} = this.state

        const user = {username, password}

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({user})
        })
        .then(r => r.json())
        .then(response => {
            // The token below will be used as a header for Authorization in your fetches
            // If you look in application controller we are requesting the header Authorization
            // Once it is recieved the token is decrypted and access to data is granted
            localStorage.setItem("token", response.jwt)
            let decoded = jwt.decode(response.jwt, "put your env here");
            console.log(decoded)
            localStorage.setItem("id", response.user.id)
            // console.log(response)
            this.setState({
                currentUser: response.user.username, 
                currentUserId: response.user.id,
                loggedIn: true
            })
            this.props.history.push(`/user/${this.state.currentUserId}`)
            this.props.handleLogin(true, this.state.currentUserId)
        })
        
    }


    render(){
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src='/beers/beer5.svg' /> Log-in to your account
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
        
                <Form.Button color='blue' fluid size='large' content="Submit">
                    Login
                </Form.Button>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='/signup'>Sign Up</a>
            </Message>
            </Grid.Column>
        </Grid>
        )
    }

}

export default Login;