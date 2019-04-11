import React, { useState } from 'react'
import styled from 'styled-components'
import { FaQuestionCircle } from 'react-icons/fa'
import { Colors } from '../../utils/style-globals'

const Trigger = styled.div`
    display: inline-block;
    position: relative;
    margin-left: 10px;
    vertical-align: bottom;
    font-size: 18px;

    svg {
        vertical-align: bottom;
    }
`;

const Box = styled.div`
    position: absolute;
    background-color: ${Colors.lightGray};
    color: black;
    visibility: hidden;
    transform: translateY(-100%);
    left: 200%;
    border: 2px solid #295730;
    border-radius: 5px;
    padding: 10px;
    z-index: 100;
    min-width: 300px;
    max-width: 1000px;
    opacity: 0;
    transition: all 100ms linear;

    ${Trigger}:hover & {
        opacity: 1;
        visibility: visible;
    }
`;

const renderToolTip = function(props){
    return(
        <Trigger>
            <FaQuestionCircle />
            <Box>{ props.children }</Box>
        </Trigger>
    );
};

export default renderToolTip;