import React from 'react'
import { Grid, Image, Card, Divider } from 'semantic-ui-react'

class User extends React.Component {
    constructor() {
        super()

        this.state = {
            username: '',
            image: '',
            about: ''
        }
    }


    componentDidMount() {
        fetch('http://localhost:3000/users/1')
            .then(r => r.json())
            .then(user => {
                console.log(user)
                this.setState({
                    username: user.username,
                    image: user.image,
                    about: user.about

                })
            })
    }

    render() {
        const pStyle = {
            fontSize: '1.5em',
        };


        return (
            <>
                <Grid centered="true">
                    <Grid.Column width={4}>
                        <Card>
                            <Image src={this.state.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{this.state.username}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={9} verticalAlign="middle">
                        <p style={pStyle}>{this.state.about}</p>
                    </Grid.Column>
                </Grid>
                <Divider horizontal>Comments</Divider>
            </>
        )
    }
}

export default User;