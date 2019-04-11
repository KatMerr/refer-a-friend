import React from 'react'
import styled from 'styled-components'

const FieldWrapper = styled.div`
    max-width: 500px;
    position: relative;
    margin: 10px auto;
`;

const renderFieldWrapper = function(props){
    return(
        <FieldWrapper>{props.children}</FieldWrapper>
    );
};

export default renderFieldWrapper;