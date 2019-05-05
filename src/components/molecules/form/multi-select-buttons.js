import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../../atoms/button'
import ButtonRow from '../../atoms/button-row'
import Label from '../../atoms/label'
import FieldWrapper from '../../atoms/field-wrapper'
import ToolTip from '../../atoms/tooltip'

const renderMultiSelectButtons = function(props){
    const { buttons, label, onButtonClick, required, toolTip, value} = props;
    const [ selectedButtons, setSelectedButtons] = useState();

    //Controlled Component, so the value is stored on a parent and sent down throw props, so it needs to update each time that value updates
    useEffect(() => setSelectedButtons(value), [value]);

    function handleButtonClick(selectedButton){
        //Either Adding or Removing the value of the selected button
        const index = (selectedButtons) ? selectedButtons.indexOf(selectedButton.value) : -1;
        let newButtons = (selectedButtons) ? selectedButtons.slice() : [];
        if (index > -1) {
            newButtons.splice(index, 1);
        } else {
            newButtons.push(selectedButton.value);
        }
        //Call function of parent and return new array
        onButtonClick(newButtons);
    }
    function isSelected(value){
        //If there are any selected buttons and the button's value is one of them
        return !!((selectedButtons) && selectedButtons.includes(value));
    }
    return(
        <FieldWrapper>
            {(label) ? 
                <Label required={required}>
                    { label }
                    { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
                </Label>
                : null
            }
            <ButtonRow>
                {
                    buttons.map((button, i) => 
                        <Button
                            active={isSelected(button.value)}
                            disabled={button.disabled}
                            key={i}
                            name={button.name}
                            onClick={(e) => handleButtonClick(e.target)}
                            type="button"
                            variant="secondary"
                            value={button.value}>{button.name}</Button>
                    )
                }
            </ButtonRow>
        </FieldWrapper>
    );
};

renderMultiSelectButtons.defaultProps = {
    required: false,
    value: []
};

renderMultiSelectButtons.propTypes = {
    buttons: PropTypes.array.isRequired,
    label: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
    value: PropTypes.array.isRequired
};

export default renderMultiSelectButtons;