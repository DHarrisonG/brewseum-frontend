import React from 'react'

class Bar extends React.Component {
    constructor() {
        super()

        this.state = {
            name: "",
            opened: "",
            overview: "",
            image: "",
            comments: []
        }
    }



    componentDidMount() {
        this.fetchBar()
    }

    fetchBar = () => {
        const urlInput = parseInt(window.location.href.split("/").slice(-1)[0])
        fetch(`http://localhost:3000/bars/${urlInput}`)
            .then(r => r.json())
            .then(bar => {
                this.setState({
                    name: bar.name,
                    opened: bar.opened,
                    overview: bar.overview,
                    image: bar.image,
                    comments: bar.comments
                })
            })

    }

    render() {
        return (
            <>
                <div class="ui segment barImage">
                </div>
                <div class="ui segment">
                    <p>{this.state.overview}</p>
                </div>
            </>
        )
    }
}

export default Bar;