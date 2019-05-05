import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const MenuItem = styled.div`
    padding: 20px 10px;
    border: 1px solid black;
    cursor: pointer;

    ${props => props.active && css`
        border-right: none;
    `}
`;

const renderMenuItem = function(props){
    const { active, onClick } = props;
    return(
        <MenuItem active={active} onClick={onClick}>{props.children}</MenuItem>
    );
};

renderMenuItem.defaultProps = {

};

renderMenuItem.propTypes = {
    onClick: PropTypes.func
};

export default renderMenuItem;