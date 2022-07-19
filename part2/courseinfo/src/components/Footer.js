import React from 'react'

const Footer = ({parts}) => <h3>Number of exercises {parts.reduce((p, c) => p + c.exercises, 0)}</h3>

export default Footer