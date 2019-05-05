import React from 'react'
import styled from 'styled-components'

const ButtonRow = styled.div`
    display: block;
    width: 100%;
    margin: 10px auto;
    text-align: center;
`;

const renderButtonRow = function(props){
    return(
        <ButtonRow>{props.children}</ButtonRow>
    );
};

export default renderButtonRow;