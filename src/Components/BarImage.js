import React from 'react'


class BarImage extends React.Component {

    render(){

        return (
            <div>
              <img class="barImage" src={`/int/${this.props.image}.jpg`}/>  
            </div>
        )
    }
}

export default BarImage;

