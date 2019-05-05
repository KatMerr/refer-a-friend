import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

const Dropdown = styled.select`
    padding: 10px;
    outline: none;
    box-sizing: border-box;
    max-width: 300px;
    width: 100%;
    color: ${ Colors.darkGray };
    border: 1px solid ${ Colors.darkGreen };
    -webkit-transition: all 100ms linear;
    transition: all 100ms linear;
    cursor: pointer;
    margin-left: 20px;

    &:hover {
        background-color: ${Colors.green};
        color: ${Colors.mint};
    }
`;

const Option = styled.option`
    margin: 10px 0;
`;

const renderDropDown = function(props){
    const { className, disabled, id, name, onChange, options, value } = props;
    return(
        (options) ?<>
        <div>{value}</div>
            <Dropdown className={className} disabled={disabled} name={name} id={id} onChange={(e) => onChange(e.target.value)} value={value}>
                <Option value="" selected={value === ""}></Option>
                {
                    options.map((option, i) => <Option key={i} value={option.value} selected={option.value === value}>{option.name}</Option>)
                }
            </Dropdown>
            </>
            : null
    );
};

renderDropDown.defaultProps = {
    disabled: false
};

renderDropDown.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string
};

export default renderDropDown;