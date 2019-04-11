import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../atoms/logo'
import NavigationLink from '../atoms/navigation-link'
import { Colors } from '../../utils/style-globals'

const NavigationWrapper = styled.nav`
    width: 100%;
    background-color: ${Colors.darkGreen};
    height: 60px;
    margin: 0 auto;
`;

const InteriorWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;

    & * {
        vertical-align: middle;
    }
`;

const StyledLogo = styled(Logo)`
    margin-left: 25px;
    cursor: pointer;
`

const LinksWrapper = styled.div`
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 50px;
`;

const renderNavigation = function(props){
    return (
        <NavigationWrapper>
            <InteriorWrapper>
                <Link to="/">
                    <StyledLogo variant="tiny" />
                </Link>
                <LinksWrapper>
                    <NavigationLink path="/">Home</NavigationLink>
                    <NavigationLink path="/add-referal">Add Referal</NavigationLink>
                    <NavigationLink path="/add-product">Add Product</NavigationLink>
                </LinksWrapper>
            </InteriorWrapper>
        </NavigationWrapper>
    )
}

export default renderNavigation;