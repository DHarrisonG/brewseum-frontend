import React from 'react'
import { Input, Button, Menu } from 'semantic-ui-react'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: '',
        }
    }
    // state = { activeItem: '' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleClick = () => {
        this.props.handleLogout()
        this.props.history.push('/')
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu inverted>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    href='http://localhost:3001/'
                />
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                    href='http://localhost:3001/user'
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item>
                    {this.props.loggedIn ? <Button color="blue" onClick={this.handleClick}>Log-Out</Button> : 
                            <Button color="blue" href='http://localhost:3001/login'>Log-In</Button>
                        }
                        </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Nav;