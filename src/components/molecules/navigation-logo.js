import React from 'react'
import styled, { keyframes } from 'styled-components'
import Logo from '../atoms/logo'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Shake = keyframes`
    0% {
        transform: rotate(0) translateY(-50%);
    }
    10% {
        transform: rotate(10deg) translateY(-50%);
    }
    20% {
        transform: rotate(-15deg) translateY(-50%);
    }
    30% {
        transform: rotate(10deg) translateY(-50%)
    }
    40% {
        transform: rotate(0) translateY(-50%);
    }
`;

const LogoWrapper = styled.div`
    width: ${(props) => props.width + "px"};
    display: inline-block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: center;

    &:hover {
        animation: ${Shake} 2s linear infinite;
    }
`;

function renderNavLogo(props){
    const { path, width } = props;
    return (
        <LogoWrapper width={width}>
            <Link to={path}>
                <Logo variant="short" />
            </Link>
        </LogoWrapper>
    );
}

renderNavLogo.defaultProps = {
    path: "/",
    width: 30
};

renderNavLogo.propTypes = {
    path: PropTypes.string,
    width: PropTypes.number
}

export default renderNavLogo;