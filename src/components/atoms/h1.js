import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const H1 = styled.h1`
    color: black;
    font-size: 3rem;
    font-family: cursive;
`

const renderH1 = function(props){
    return (
        <H1>{props.children}</H1>
    )
}

export default renderH1