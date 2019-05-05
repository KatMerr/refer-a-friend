import React from 'react'
import styled from 'styled-components'
import { Colors, Fonts } from '../../utils/style-globals'

const H3 = styled.h3`
    color: ${Colors.black};
    font-family: ${Fonts.types.brush};
    font-size: ${Fonts.sizes.large};
    text-align: center;
`;

const renderH3 = function(props){
    const { className } = props;
    return (
        <H3 className={className}>{props.children}</H3>
    )
}

export default renderH3