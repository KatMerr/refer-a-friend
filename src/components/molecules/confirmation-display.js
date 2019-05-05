import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Title from '../atoms/h3'
import Paragraph from '../atoms/paragraph'

const ConfirmationDisplay = styled.div`
    
`;

const renderConfirmationDisplay = function(props){
    const { message, explanation } = props;
    return(
        <ConfirmationDisplay>
            <Title>{message}</Title>
            { (explanation) ? <Paragraph>{explanation}</Paragraph> : null }
            { props.children }
        </ConfirmationDisplay>
    );
};

renderConfirmationDisplay.defaultProps = {
};

renderConfirmationDisplay.propTypes = {
};

export default renderConfirmationDisplay;