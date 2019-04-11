import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../utils/style-globals'

const ProductTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
`;

const renderProductTitle = function(props){
    return(
        <ProductTitle>{props.children}</ProductTitle>
    );
};

export default renderProductTitle;