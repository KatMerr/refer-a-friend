import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import GenericCardImage from '../../images/generic_bank.png'
import Image from '../atoms/image'
import { DataPiece, ICON_VARIANTS } from '../atoms/data-piece'
import ProductTitle from '../atoms/product-title'

const CreditCardDisplay = styled.div`
    margin: 20px auto;
    display: grid;
    grid-template-columns: 33% 67%;
    grid-template-rows: 50px auto;
    min-height: 200px;
`;

const StyledImage = styled(Image)`
    grid-column: 1 / 1;
    grid-row: 1 / span 2;
`;
const StyledTitle = styled(ProductTitle)`
    grid-column: 2 / 2;
    grid-row: 1 / 1;
    align-self: center;
`;
const DataPieceRow = styled.div`
    grid-column: 2 / 2;
    grid-row: 2 / 2;
    align-self: center;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 100%;
`;


const renderCreditCardDisplay = function(props){
    let { cardDetails, image, name } = props.product;
    image = image.imageURL || GenericCardImage;
    let { annualFee, benefits, introBonus, issuer, rewardType } = cardDetails;
    return (
        <CreditCardDisplay>
            <StyledImage src={image} alt={"Image of " + name}></StyledImage>
            <StyledTitle>{name}</StyledTitle>
            <DataPieceRow>
                <DataPiece data={annualFee} label={"Annual Fee"} variant={ICON_VARIANTS.MONEY} />
                <DataPiece data={introBonus} label={"Intro Bonus"} />
                <DataPiece data={issuer} label={"Card Issuer"} variant={ICON_VARIANTS.CREDIT_CARD} />
            </DataPieceRow>
        </CreditCardDisplay>
    );
};

renderCreditCardDisplay.propTypes = { 
    product: PropTypes.object.isRequired
}

export default renderCreditCardDisplay;