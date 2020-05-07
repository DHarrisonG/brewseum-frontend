import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const Badge = (props) => (

      <Image src={`/ext/${props.barImage}.jpg`} circular/>
)

export default Badge;