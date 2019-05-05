import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors, Fonts } from '../../utils/style-globals'

const H2 = styled.h2`
    color: ${Colors.black};
    font-family: ${Fonts.types.brush};
    font-size: ${Fonts.sizes.large};
    text-align: center;
`;

const renderH2 = function(props){
    const { className } = props;
    return (
        <H2 className={className}>{props.children}</H2>
    )
}

export default renderH2