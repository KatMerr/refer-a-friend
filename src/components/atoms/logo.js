import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import LongLogo from '../../images/logo.png'
import ShortLogo from '../../images/shortened-logo.png'

const Logo = styled.img`
    width: 100%;
`;

const renderLogo = function(props){
    const { className, variant } = props;
    let src = "";
    if (variant === "short"){
        src = ShortLogo;
    } else {
        src = LongLogo;
    }
    return(
        <Logo className={className} variant={ variant } src={ src }></Logo>
    );
};

renderLogo.defaultProps = {
    variant: "long"
};

renderLogo.propTypes = {
    variant: PropTypes.oneOf(["short","long"])
};

export default renderLogo;