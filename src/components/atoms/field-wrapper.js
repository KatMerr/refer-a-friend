import React from 'react'
import styled from 'styled-components'

const FieldWrapper = styled.div`
    position: relative;
    margin: 20px auto;
`;

const renderFieldWrapper = function(props){
    return(
        <FieldWrapper>{props.children}</FieldWrapper>
    );
};

export default renderFieldWrapper;