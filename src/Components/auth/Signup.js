import React from 'react'
import { Button, Form, Grid, TextArea } from 'semantic-ui-react'
import axios from 'axios';


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
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    // handleSubmit = (e) => {
    //     console.log(this.state.password)
    //     fetch("http://localhost:3000/users", {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json' 
    //         },
    //         body: JSON.stringify({
    //             users: {
    //                 username: this.state.username,
    //                 password: this.state.password,
    //                 password_confirmation: this.state.password_confirmation,
    //                 image: this.state.image,
    //                 about: this.state.about 
    //             }
    //         })
    //     } )
    // }

    handleSubmit = (e) => {
        axios.post("http://localhost:3000/registrations", {


            user: {
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            image: this.state.image,
            about: this.state.about
        }})
        .then(response => {
            if(response.data.status === 'created') {
    this.props.handleSuccessfulAuth(response.data)
}
        })
        .catch (error => {
    console.log("registration error", error)
})
    }

render() {
    return (
        <>
            <h1>Sign-up Page</h1>
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field >
                                <Form.Input
                                    required
                                    label="Username"
                                    name="username"
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    required
                                    label="Password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    required
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label="Image"
                                    name="image"
                                    placeholder="http://www.website.com/profilephoto"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea
                                    required
                                    label="About"
                                    name="about"
                                    placeholder='Tell us more about you!'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Button content="Submit" />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
}

export default Signup; 