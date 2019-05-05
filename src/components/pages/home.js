import React from 'react'
import RandomReferalForm from '../organisms/get-random-referal-form'
import styled from 'styled-components'
import Logo from '../atoms/logo'
import Paragraph from '../atoms/paragraph'

const MainLogo = styled(Logo)`
    display: block;
    margin: 0 auto 40px auto;
    max-width: 600px;
`;

const PageContainer = styled.div`
    margin-top: 10vh;
`;


const HomePage = function() {

    return (
            <PageContainer>
                <MainLogo variant="long" />
                <Paragraph>Welcome to the Refer-A-Friend program fulfillment site! Simply search for what you're looking for below and we'll find a referal you can use to help someone out!</Paragraph>
                <RandomReferalForm></RandomReferalForm>
            </PageContainer>
                    
    );
};

export default HomePage;