import React from 'react'
import { Button, Form, Grid, TextArea} from 'semantic-ui-react'

class oldSignup extends React.Component {
    constructor(){
        super()
        this.state = {
            username: "wtf",
            password: "",
            image: "",
            about: ""
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log(this.state.password)
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                users: {
                    username: this.state.username,
                    password: this.state.password,
                    image: this.state.image,
                    about: this.state.about 
                }
            })
        } )
    }

    render() {
        return (
            <>
            <h1>{this.state.username}</h1>
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

export default oldSignup; 