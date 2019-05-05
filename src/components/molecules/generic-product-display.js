import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import GenericCardImage from '../../images/generic_bank.png'
import Image from '../atoms/image'
import ProductTitle from '../atoms/product-title'

const GenericProductDisplay = styled.div`
    margin: 20px auto;
    display: grid;
    grid-template-columns: 33% 67%;
    grid-template-rows: 100%;
    min-height: 200px;
`;

const renderGenericProductDisplay = function(props){
    let { image, name, bonus } = props.product;
    image = image.imageURL || GenericCardImage;

    return (
        <GenericProductDisplay>
            <Image src={image} alt={"Image of " + name}></Image>
            <ProductTitle>{name}</ProductTitle>
        </GenericProductDisplay>
    );
};

renderGenericProductDisplay.propTypes = { 
    product: PropTypes.object.isRequired
}

export default renderGenericProductDisplay;