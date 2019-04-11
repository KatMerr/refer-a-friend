import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../../atoms/button'
import Label from '../../atoms/label'
import FieldWrapper from '../../atoms/field-wrapper'
import ToolTip from '../../atoms/tooltip'

const ButtonsContainer = styled.div`
    text-align: center;
`;

const renderMultiSelectButtons = function(props){
    const { labelValue, onButtonClick, required, toolTip} = props;

    const [ buttons, setButtons ] = useState(props.buttons);

    function handleButtonClick(selectedButton){
        //Controlled Component Functionality
        onButtonClick(selectedButton.value);
        //Deselect All Other Buttons and Select
        let buttonsClone = buttons.slice(0);
        buttonsClone.map(button => {
            if (button.name === selectedButton.name) button.active = !button.active;
        });
        setButtons(buttonsClone);
    }
    return(
        <FieldWrapper>
            {(labelValue) ? 
                <Label required={required}>
                    { labelValue }
                    { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
                </Label>
                : null
            }
            <ButtonsContainer>
                {
                    buttons.map((button, i) => 
                        <Button
                            active={button.active}
                            disabled={button.disabled}
                            key={i}
                            name={button.name}
                            onClick={(e) => handleButtonClick(e.target)}
                            type="button"
                            variant="secondary"
                            value={button.value}>{button.name}</Button>
                    )
                }
            </ButtonsContainer>
        </FieldWrapper>
    );
};

renderMultiSelectButtons.defaultProps = {
    required: false
};

renderMultiSelectButtons.propTypes = {
    buttons: PropTypes.array.isRequired,
    labelValue: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string
};

export default renderMultiSelectButtons;