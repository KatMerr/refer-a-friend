import React from 'react'
import styled from 'styled-components'
import { Colors, Fonts } from '../../utils/style-globals'

const Code = styled.div`
    display: inline-block;
    background-color: ${Colors.lightGray};
    color: ${Colors.black};
    padding: 5px 10px;
    font-size: ${Fonts.sizes.large};
    font-weight: ${Fonts.weights.bold};
`;

const renderCode = function(props){
    return(
        <Code>{props.children}</Code>
    );
};

export default renderCode;