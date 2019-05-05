import React from 'react'
import PropTypes from 'prop-types'
import Input from '../../atoms/text-input'
import Label from '../../atoms/label'
import ToolTip from '../../atoms/tooltip'
import FieldWrapper from '../../atoms/field-wrapper'

const InputWithLabel = function(props) {

    const {disabled, id, label, maxLength, max, min, name, placeholder, onChange, required, toolTip, type, value } = props;

    return (
        <FieldWrapper>
            <Label for={id} required={required}>
                { label }
                { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
            </Label>
            <Input
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                max={max}
                min={min}
                name={name}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                value={value} />
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
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
    type: PropTypes.oneOf(["number", "password", "text", "url"]),
    value: PropTypes.string.isRequired

}

export default InputWithLabel;