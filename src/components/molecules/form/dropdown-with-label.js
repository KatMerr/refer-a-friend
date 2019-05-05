import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../../atoms/dropdown'
import Label from '../../atoms/label'
import ToolTip from '../../atoms/tooltip'
import FieldWrapper from '../../atoms/field-wrapper'

const CheckboxWithLabel = function(props) {

    const { disabled, id, label, name, onChange, options, required, toolTip, value } = props;

    return (
        (options) ?
            <FieldWrapper>
                <Label for={id} required={required}>
                    { label }
                    { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
                </Label>
                <Dropdown disabled={disabled} id={id} name={name} onChange={onChange} options={options} value={value} />
            </FieldWrapper>
        : null
    );
}

CheckboxWithLabel.defaultProps = {
    required: false
}

CheckboxWithLabel.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
    value: PropTypes.string.isRequired
}

export default CheckboxWithLabel;