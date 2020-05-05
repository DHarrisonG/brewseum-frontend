import React from 'react'


class BarImage extends React.Component {

    render(){

        return (
            <div class="ui segment barImage">
              <img class="barImage" src={this.props.image}/>  
            </div>
        )
    }
}

export default BarImage;