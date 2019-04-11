import React from 'react'
import styled, { css }  from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

//Input needs a better focus styling

const Input = styled.input`
    border-radius: 20px;
    padding: 10px;
    width: 100%;
    outline: none;
    box-sizing: border-box;
    color: ${Colors.darkGray};
    border: 1px solid ${Colors.darkGreen};
    transition: box-shadow 100ms linear;

    ${props => props.variant === 'rounded' && css`
        &:focus{
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    `}

    ${props => props.disabled && css`
        background-color: ${Colors.lightGray};
    `}
    
    
    &:focus {
        -webkit-box-shadow: 0px 0px 10px 0px ${Colors.green};
        -moz-box-shadow: 0px 0px 10px 0px ${Colors.green};
        box-shadow: 0px 0px 10px 0px ${Colors.green};
    }
`;

const renderInput = function(props){
    const { autoFocus, className, disabled, id, name, maxLength, onBeforeInput, onBlur, onChange, onFocus, onKeyDown, placeholder, type, value, variant} = props;
    
    return (
        <Input
            autoFocus={autoFocus}
            className={className}
            disabled={disabled}
            id={id}
            maxLength={maxLength}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onBeforeInput={onBeforeInput}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            type={type}
            value={value}
            variant={variant} />
    )
};

Input.defaultProps = {
    autoFocus: false,
    disabled: false
};

Input.propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['generic', 'rounded'])
};

export default renderInput;