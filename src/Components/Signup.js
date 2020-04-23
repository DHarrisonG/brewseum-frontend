import React from 'react'
import { Button, Form, Grid, TextArea} from 'semantic-ui-react'

class Signup extends React.Component {
    state = {
        Username: "",
        Password: "",
        Image: "",
        About: ""
    }
    handleChange = (e) => {
        this.setState = {
            name: e.target.value
        }
    }

    handleSubmit = () => {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: this.state.Username,
                password: this.state.password,
                image: this.state.image,
                about: this.state.about 
            })
        } )
    }

    handlePostUser = () => {

    }

    render() {
        return (
            <>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field >
                                    <Form.Input
                                        required
                                        label="Username"
                                        name="Username"
                                        placeholder="Username"
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        required
                                        label="Password"
                                        name="Password"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        label="Image"
                                        name="Image"
                                        placeholder="http://www.website.com/profilephoto"
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.TextArea
                                        required
                                        label="About"
                                        name="About"
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