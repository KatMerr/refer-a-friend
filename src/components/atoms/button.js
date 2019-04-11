import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

const Button = styled.button`
    color: ${Colors.lightGray};
    padding: 10px;
    border: 2px solid ${Colors.lightGray};
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 100ms linear;
    outline: none;
    font-size: 18px;
    margin: 10px 5px;

    ${ (props) => props.variant === "primary" && css`
        
        background-color: ${Colors.lightGreen};
        color: ${Colors.mint};
        &:hover {
            background-color: ${Colors.mint};
            color: ${Colors.lightGreen};
            border-color: ${Colors.lightGreen};
        }
    `}

    ${ (props) => props.variant === "secondary" && css`
        background-color: ${Colors.darkGreen};
        color: ${Colors.mint};
        &:hover {
            background-color: ${Colors.lightGreen};
        }
    `}
    ${ (props) => props.variant === "secondary" && props.active && css`
        background-color: ${Colors.lightGreen};
    `}

    ${ (props) => props.variant === "danger" && css`
        background-color: ${Colors.red};
        color: #FFF;
        &:hover {
            background-color: ${Colors.darkRed};
            
        }
    `}
`;

const renderButton = function(props){
    const { active, className, disabled, name, onClick, type, variant, value } = props;
    return (
        <Button
            active={active}
            className={className}
            disabled={disabled}
            name={name}
            onClick={onClick}
            type={type}
            value={value}
            variant={variant}>{props.children}</Button>

    )
};

renderButton.defaultProps = {
    active: false,
    type: "button",
    variant: "primary"
};

renderButton.propTypes = { 
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    value: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary", "danger"])
};

export default renderButton;