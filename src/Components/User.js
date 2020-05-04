import React from 'react'
import { Grid, Image, Card, Divider } from 'semantic-ui-react'
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
            userBars: [],
            loggedIn: false
            // joined: ''
        }
    }


    componentDidMount() {
        this.fetchUser()
    }
    
    fetchUser = () => {
        const urlInput = parseInt(window.location.href.split("/").slice(-1)[0])
        fetch(`http://localhost:3000/users/${urlInput}`)
            .then(r => r.json())
            .then(user => {
                console.log(user)
                this.setState({
                    userId: user.id,
                    username: user.username,
                    image: user.image,
                    about: user.about,
                    comments: user.comments.reverse(),
                    userBars: user.user_bars.reverse()
                    // joined: user.created_at
    
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
                        {this.state.userBars.map(userBar =>
                            <Grid.Column>
                              <Badge barImage={userBar.bar.image}/>
                            </Grid.Column>
                        )}
                        </Grid>
                <Divider horizontal>Comments</Divider>
                <div class="comments">
                {this.state.comments.map(comment =>
                    <Comments 
                    key={comment.id} 
                    commentId={comment.id}
                    barId={comment.bar_id}
                    comment={comment.comment} 
                    />
                )}
                </div>
            </>
        )
    }
}

export default User;