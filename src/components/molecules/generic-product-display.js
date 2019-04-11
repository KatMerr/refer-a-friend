import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import GenericCardImage from '../../images/generic_bank.png'
import Image from '../atoms/image'

const GenericProductDisplay = styled.div`
    width: 75%;
    margin: 0 auto;
`;

const ImageContainer = styled.div`
    display: inline-block;
    width: 33%;
`;

const InformationContainer = styled.div`
    display: inline-block;
    width: 67%;
    vertical-align: top;
    padding: 40px 0 20px 20px;
    text-align: left;
    box-sizing: border-box;
`;

const renderGenericProductDisplay = function(props){
    let { image, name, bonus } = props.product;

    console.log(props.product);
    image = GenericCardImage;
    return (
        <GenericProductDisplay>
            <ImageContainer>
                <Image src={image} alt={"Image of " + name}></Image>
            </ImageContainer>
            <InformationContainer>
                <div>{name}</div>
            </InformationContainer>
        </GenericProductDisplay>
    );
};

renderGenericProductDisplay.propTypes = { 
    product: PropTypes.object.isRequired
}

export default renderGenericProductDisplay;