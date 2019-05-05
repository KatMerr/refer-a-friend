import React from 'react'
import styled from 'styled-components'
import { Fonts, Colors } from '../../utils/style-globals'

const ProductTitle = styled.div`
    color: ${Colors.black};
    font-size: ${Fonts.sizes.large};
    font-weight: ${Fonts.weights.bold};
    text-align: center;
`;

const renderProductTitle = function(props){
    const { className } = props;
    return(
        <ProductTitle className={className}>{props.children}</ProductTitle>
    );
};

export default renderProductTitle;