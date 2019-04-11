import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import GenericCardImage from '../../images/generic_bank.png'
import Image from '../atoms/image'
import { DataPiece, ICON_VARIANTS } from '../atoms/data-piece'
import ProductTitle from '../atoms/product-title'

const CreditCardDisplay = styled.div`
    margin: 30px auto;
`;

const ImageContainer = styled.div`
    display: inline-block;
    width: 33%;
`;

const InformationContainer = styled.div`
    display: inline-block;
    width: 67%;
    vertical-align: top;
    padding: 0 0 20px 20px;
    text-align: left;
    box-sizing: border-box;
`;

const DataPieceRow = styled.div`
    & > div{
        width: 33%;
    }
`;

const renderCreditCardDisplay = function(props){
    let { cardDetails, image, imageSrc, name } = props.product;
    let { annualFee, benefits, introBonus, issuer, rewardType } = cardDetails;
    image = GenericCardImage;
    return (
        <CreditCardDisplay>
            <ImageContainer>
                <Image src={image} alt={"Image of " + name}></Image>
            </ImageContainer>
            <InformationContainer>
                <ProductTitle>{name}</ProductTitle>
                <DataPieceRow>
                    <DataPiece data={annualFee} label={"Annual Fee"} variant={ICON_VARIANTS.MONEY} />
                    <DataPiece data={introBonus} label={"Intro Bonus"} />
                    <DataPiece data={issuer} label={"Card Issuer"} variant={ICON_VARIANTS.CREDIT_CARD} />
                </DataPieceRow>
            </InformationContainer>
        </CreditCardDisplay>
    );
};

renderCreditCardDisplay.propTypes = { 
    product: PropTypes.object.isRequired
}

export default renderCreditCardDisplay;