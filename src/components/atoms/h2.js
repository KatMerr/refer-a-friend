import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const H2 = styled.h2`
    color: black;
    font-size: 3rem;
    font-family: cursive;
`

const renderH2 = function(props){
    return (
        <H2>{props.children}</H2>
    )
}

export default renderH2