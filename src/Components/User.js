import React from 'react'
import { Grid, Image, Card, Divider } from 'semantic-ui-react'

class User extends React.Component {

    
    render() {
        const pStyle = {
            fontSize: '1.5em',
          };


        return (
            <>
                <Grid centered="true">
                    <Grid.Column width={4}>
                        <Card>
                            <Image src='https://i.imgur.com/8KrqXXw.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>GoodBoi</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>
                                    Gooboi is a dog living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={9} verticalAlign="middle">
                        <p style={pStyle}>Delaware fucking sucks. It’s small, insignificant, poorly educated, expensive, cold,
                        and a disgrace to our union. Probably the only thing it has going for is the fact it’s the
                        first state and there’s no sales tax. We should declare war on the state,
                        first occupying Wilmington and then harnessing our nuclear arms to obliterate
                            that pathetic state from existence.</p>
                    </Grid.Column>
                </Grid>
                <Divider horizontal>Comments</Divider>
            </>
        )
    }
}

export default User;