import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Label = styled.label`
    color: black;
    display: inline-block;
    text-decoration: underline;
    margin-bottom: 10px;
`

const renderLabel = function(props){
    const { required } = props;
    return (
        <Label htmlFor={props.for}>{(required) ? "*" : null}{props.children}</Label>
    )
}

renderLabel.propTypes = {
    for: PropTypes.string,
    required: PropTypes.bool
}

export default renderLabel