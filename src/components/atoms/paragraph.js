import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Fonts } from '../../utils/style-globals'

const Paragraph = styled.p`
    font-family: ${Fonts.types.lora};
    margin: 20px 0;
`;

const renderParagraph = function(props){
    return(
        <Paragraph className={props.className}>{props.children}</Paragraph>
    );
};

export default renderParagraph;