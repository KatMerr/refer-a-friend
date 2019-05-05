import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

const CheckBox = styled.input`
    color: ${Colors.lightGray};
    border: 2px solid ${Colors.lightGray};
    padding: 13px;
    border-radius: 5px;
    cursor: pointer;
    -webkit-transition: background-color 100ms linear;
    transition: background-color 100ms linear;
    outline: none;
    margin: 10px 5px;
    background-color: ${Colors.darkGreen};
    vertical-align: middle;
    -webkit-appearance: button;

    &:hover {
        background-color: ${Colors.lightGreen};
    }

    ${ props => props.checked && css`
        background-color: ${Colors.lightGreen};
    `}
`;

const renderCheckBox = function(props){
    const { id, isChecked, onChange, name } = props;
    return(
        <CheckBox
            checked={isChecked}
            id={id}
            name={name}
            onChange={onChange}
            type="checkbox" />
    );
};

renderCheckBox.defaultProps = {

};

renderCheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string
};

export default renderCheckBox;