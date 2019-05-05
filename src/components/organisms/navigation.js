import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NavigationLink from '../atoms/navigation-link'
import NavigationLogo from '../molecules/navigation-logo'
import { Colors, Breakpoints } from '../../utils/style-globals'

//Lets make this CSS grid instead of using flex

const NavigationWrapper = styled.nav`
    width: 100%;
    background-color: ${Colors.darkGreen};
    height: 60px;
    margin: 0 auto;
`;

const InteriorWrapper = styled.div`
    max-width: ${Breakpoints.max};
    margin: 0 auto;
    height: 100%;

    & * {
        vertical-align: middle;
    }
`;

const LinksWrapper = styled.div`
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

//Need to find a way to change navigation links when login/logout happens. Context?

const renderNavigation = function(props){
    const { links } = props;
    return (
        <NavigationWrapper>
            <InteriorWrapper>
                <NavigationLogo width={30} path="/" />
                <LinksWrapper>
                    {
                        links.map((link, i) => <NavigationLink key={i} path={link.path}>{link.name}</NavigationLink>)
                    }
                </LinksWrapper>
            </InteriorWrapper>
        </NavigationWrapper>
    )
}

renderNavigation.propTypes = {
    links: PropTypes.array.isRequired
}

export default renderNavigation;