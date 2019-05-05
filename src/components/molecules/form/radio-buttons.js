import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../../atoms/button'
import Label from '../../atoms/label'
import FieldWrapper from '../../atoms/field-wrapper'
import ToolTip from '../../atoms/tooltip'

const ButtonsContainer = styled.div`
    text-align: center;
`;

const renderRadioButtons = function(props){

    const { buttons, label, onButtonClick, required, toolTip, value } = props;
    const [ selectedButton, setSelectedButton] = useState(value);
    
    useEffect(() => setSelectedButton(value), [value]);
    
    return(
        <FieldWrapper>
            {(label) ? 
                <Label required={required}>
                    { label }
                    { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
                </Label>
                : null
            }
            <ButtonsContainer>
                {
                    buttons.map((button, i) => 
                        <Button
                            active={button.value === selectedButton}
                            disabled={button.disabled}
                            key={i}
                            name={button.name}
                            onClick={(e) => onButtonClick(e.target.value)}
                            type="button"
                            variant="secondary"
                            value={button.value}>{button.name}</Button>
                    )
                }
            </ButtonsContainer>
        </FieldWrapper>
    );
};

renderRadioButtons.defaultProps = {
    required: false
};

renderRadioButtons.propTypes = {
    buttons: PropTypes.array.isRequired,
    label: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string
};

export default renderRadioButtons;