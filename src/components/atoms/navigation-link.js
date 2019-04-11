import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Colors } from '../../utils/style-globals'

const StyledLink = styled(Link)`
    color: ${Colors.mint};
    text-decoration: none;
    font-size: 18px;
    margin: 0 10px;
    transition: color 100ms linear;

    &:hover {
        color: ${Colors.lightGreen}
    }
`;

const renderNavigationLink = function(props){
    const { name, path } = props;
    return(
        <StyledLink to={path} name={name}>{props.children}</StyledLink>
    );
};

renderNavigationLink.propTypes = {
    name: PropTypes.string,
    path: PropTypes.string.isRequired
};

export default renderNavigationLink;