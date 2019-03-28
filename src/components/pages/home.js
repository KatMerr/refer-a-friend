import React from 'react'
import Title from '../atoms/title'
import RandomReferalForm from '../organisms/get-random-referal-form'
import styled from 'styled-components'

const AppContainer = styled.div`
    background-color: green;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    color: white;
    font-family: serif;
    overflow: hidden;
`;

const AppContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const HomePageContainer = styled.div`
    width: 100%;
    text-align: center;
`;

const Paragraph = styled.p`
    font-size: 1rem;
    color: white;
    font-weight: normal;
`;


function HomePage() {

    return (
        <AppContainer>
            <AppContent>
                <HomePageContainer>
                    <Title heading="Refer-A-Friend" />
                    <Paragraph>
                        This site is used to help people fulfill their refer a friend bonus.
                    </Paragraph>
                    <RandomReferalForm></RandomReferalForm>
                </HomePageContainer>
            </AppContent>
        </AppContainer>
    );
};

export default HomePage;