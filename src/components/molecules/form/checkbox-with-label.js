import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../atoms/checkbox'
import Label from '../../atoms/label'
import ToolTip from '../../atoms/tooltip'
import FieldWrapper from '../../atoms/field-wrapper'

const InputWithLabel = function(props) {

    const { id, isChecked, labelValue, name, onChange, required, toolTip  } = props;

    return (
        <FieldWrapper>
        <Label for={id} required={required}>
            { labelValue }
            { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
        </Label>
            <Checkbox
                id={id}
                isChecked={ isChecked }
                onChange={ onChange }
                name={ name } />
        </FieldWrapper>
    );
}

InputWithLabel.defaultProps = {
    required: false
}

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    labelValue: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
}

export default InputWithLabel;