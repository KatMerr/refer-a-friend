import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaDollarSign, FaCreditCard, FaExclamation } from 'react-icons/fa'
import { Colors } from '../../utils/style-globals'

export const ICON_VARIANTS = {
    NONE: "none",
    MONEY: "money",
    CREDIT_CARD: "card"
}

const Icon = styled.div`
    display: inline-block;
    min-width: 100px;
    vertical-align: top;
    padding: 0 10px;
    box-sizing: border-box;
    text-align: center;
`;

const IconContainer = styled.div`
    min-height: 50px;
    min-width: 50px;
    height: 50px;
    width: 50px;
    background-color: ${Colors.green};
    display: block;
    border-radius: 100%;
    margin: 20px auto;
    position: relative;
    font-size: 20px;

    & > svg{
        color: ${Colors.mint};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const DataLabel = styled.span`
    font-weight: 600;
`;

export const DataPiece = function(props){
    const { data, label, variant } = props;
    return(
        <Icon>
            <IconContainer>
                {
                    (variant === ICON_VARIANTS.MONEY) ? <FaDollarSign /> :
                        (variant === ICON_VARIANTS.CREDIT_CARD) ? <FaCreditCard /> :
                            <FaExclamation />
                }
            </IconContainer>
            <DataLabel>{label}:</DataLabel> {data}
        </Icon>
    );
};

DataPiece.defaultProps = {
    variant: ICON_VARIANTS.NONE
}

DataPiece.propTypes = {
    data: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(ICON_VARIANTS)
};