import React from 'react'
import RandomReferalForm from '../organisms/get-random-referal-form'
import styled from 'styled-components'
import Logo from '../atoms/logo'
import Paragraph from '../atoms/paragraph'
import { Colors, Fonts } from '../../utils/style-globals'

const MainLogo = styled(Logo)`
    display: block;
    margin: 0 auto 20px auto;
`;

const PageContainer = styled.div`
    margin-top: 20vh;
`;

const StyledParagraph = styled(Paragraph)`

`;


const HomePage = function() {

    return (
            <PageContainer>
                <MainLogo variant="large" />
                <StyledParagraph>Site DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite DescriptionSite Description</StyledParagraph>
                <RandomReferalForm></RandomReferalForm>
            </PageContainer>
                    
    );
};

export default HomePage;