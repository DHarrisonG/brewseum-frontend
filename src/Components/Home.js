import React from 'react'
import { Image } from 'semantic-ui-react'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <Image src='https://pbs.twimg.com/profile_images/818042989738016769/D92aaGDp_400x400.jpg' size='large' centered='true' />
            </div>
        )
    }
}

export default Home;