import React from 'react'


class BarImage extends React.Component {

    render(){

        return (
            <div class="ui segment barImage">
              <img class="barImage" src={`/int/${this.props.image}.jpg`}/>  
            </div>
        )
    }
}

export default BarImage;

