import React from 'react'
import { Image } from 'semantic-ui-react'

class Home extends React.Component {
    
    
    render(){
        return (
            <>
            <h1>Homepage</h1>
            <Image src='https://pbs.twimg.com/profile_images/818042989738016769/D92aaGDp_400x400.jpg' size='large' centered='true' />
            </>
        )
    } 
}

export default Home;