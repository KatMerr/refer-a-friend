import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const H3 = styled.h3`
    color: black;
    font-size: 3rem;
    font-family: cursive;
`

const renderH3 = function(props){
    return (
        <H3>{props.children}</H3>
    )
}

export default renderH3