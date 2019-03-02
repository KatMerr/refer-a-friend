import React from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
    background-color: green;
    width: 100%;
    height: 100%;
    color: white;
    font-family: fantasy;
`

const contentContainer = styled.div`
    max-width: 1200px;
    display: block;
`

function backgroundAndContent() {
    return (
        <AppContainer>
            <ContentContainer></ContentContainer>
        </AppContainer>
    );
}

export default backgroundAndContent