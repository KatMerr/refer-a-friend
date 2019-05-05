import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../atoms/checkbox'
import Label from '../../atoms/label'
import ToolTip from '../../atoms/tooltip'
import FieldWrapper from '../../atoms/field-wrapper'

const CheckboxWithLabel = function(props) {

    const { id, isChecked, label, name, onChange, required, toolTip  } = props;

    return (
        <FieldWrapper>
            <Checkbox
                id={id}
                isChecked={ isChecked }
                onChange={ onChange }
                name={ name } />
            <Label for={id} required={required}>
                { label }
                { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
            </Label>
        </FieldWrapper>
    );
}

CheckboxWithLabel.defaultProps = {
    required: false
}

CheckboxWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
}

export default CheckboxWithLabel;