import React from 'react'
import styled, { css }  from 'styled-components'
import PropTypes from 'prop-types'
import FullLogo from '../../images/logo.png'
import ShortLogo from '../../images/logo.png'

const Logo = styled.img`

    ${props => props.variant === "tiny" && css`
        width: 60px;
    `}
    ${props => props.variant === "small" && css`
        width: 120px;
    `}
    ${props => props.variant === "medium" && css`
        width: 300px;
    `}
    ${props => props.variant === "large" && css`
        width: 500px;
    `}
    ${props => props.variant === "full" && css`
        width: auto;
    `}
`;

const renderLogo = function(props){
    const { className, variant } = props;
    let src = "";
    if (variant === "tiny" || variant === "small"){
        src = ShortLogo;
    } else {
        src = FullLogo;
    }
    return(
        <Logo className={className} variant={ variant } src={ src }></Logo>
    );
};

renderLogo.defaultProps = {
    variant: "full"
};

renderLogo.propTypes = {
    variant: PropTypes.oneOf(["tiny", "small", "medium", "large", "full"])
};

export default renderLogo;