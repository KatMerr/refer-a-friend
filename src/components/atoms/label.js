import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

const Label = styled.label`
    color: ${Colors.black};
    display: inline-block;
    text-decoration: underline;
    margin-bottom: 10px;
`

const renderLabel = function(props){
    const { className, required } = props;
    return (
        <Label className={className} htmlFor={props.for}>{(required) ? "*" : null}{props.children}</Label>
    )
}

renderLabel.propTypes = {
    for: PropTypes.string,
    required: PropTypes.bool
}

export default renderLabel