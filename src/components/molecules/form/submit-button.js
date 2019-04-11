import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../../atoms/button'
import FieldWrapper from '../../atoms/field-wrapper'

const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
`;

const renderSubmitButton = function(props){
    const { onClick } = props;
    return(
        <FieldWrapper>
            <ButtonWrapper>
                <Button
                    onClick={onClick}
                    type="submit"
                    variant="primary"
                >{props.children}</Button>
            </ButtonWrapper>
        </FieldWrapper>
    );
};

renderSubmitButton.defaultProps = {

};

renderSubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default renderSubmitButton;