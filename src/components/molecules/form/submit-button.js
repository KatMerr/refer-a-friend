import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../../atoms/button'
import ButtonRow from '../../atoms/button-row'
import FieldWrapper from '../../atoms/field-wrapper'

const renderSubmitButton = function(props){
    const { onClick, isSubmitting } = props;

    return(
        <FieldWrapper>
            <ButtonRow>
                <Button
                    onClick={onClick}
                    type="submit"
                    variant="primary"
                >{props.children}</Button>
                { (isSubmitting) ? <div>Submitting...</div> : null}
            </ButtonRow>
        </FieldWrapper>
    );
};

renderSubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default renderSubmitButton;