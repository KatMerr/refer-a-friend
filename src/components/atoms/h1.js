import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors, Fonts } from '../../utils/style-globals'

const H1 = styled.h1`
    color: ${Colors.black};
    font-family: ${Fonts.types.brush};
    font-size: ${Fonts.sizes.large};
    text-align: center;
`;

const renderH1 = function(props){
    const { className } = props;
    return (
        <H1 className={className}>{props.children}</H1>
    )
}

export default renderH1