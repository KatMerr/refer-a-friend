import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../atoms/input'
import Label from '../../atoms/label'
import ToolTip from '../../atoms/tooltip'
import FieldWrapper from '../../atoms/field-wrapper'

const InputWithLabel = function(props) {

    const {disabled, id, inputValue, labelValue, maxLength, name, placeholder, onChange, required, toolTip, type } = props;

    return (
        <FieldWrapper>
            <Label for={id} required={required}>
                { labelValue }
                { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
            </Label>
            <Input
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                name={name}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                value={inputValue} />
        </FieldWrapper>
    );
}

InputWithLabel.defaultProps = {
    disabled: false,
    required: false,
    type: "text"
}

InputWithLabel.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    inputValue: PropTypes.string.isRequired,
    labelValue: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
    type: PropTypes.oneOf(["number", "password", "text", "url"])

}

export default InputWithLabel;