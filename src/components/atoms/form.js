import React from 'react'
import styled from 'styled-components'

const Form = styled.div`
    max-width: 500px;
    margin: 20px auto;
`;

const renderForm = function(props){
    return(
        <Form>{props.children}</Form>
    );
};

export default renderForm;