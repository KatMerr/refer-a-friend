import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Title = styled.h1`
    color: white;
    font-size: 3rem;
    font-family: cursive;
`

Title.defaultProps = {
    heading: "Default Heading"
}

Title.PropTypes = {
    heading: PropTypes.string
}



export default (props) => <Title>{props.heading}</Title>