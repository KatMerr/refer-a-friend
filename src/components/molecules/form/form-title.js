import React from 'react'
import styled from 'styled-components'
import FieldWrapper from '../../atoms/field-wrapper'
import Paragraph from '../../atoms/paragraph'
import H3 from '../../atoms/h3'
import { Colors } from '../../../utils/style-globals'

const FormH3 = styled(H3)`
    margin: 20px 0;
    color: ${Colors.darkGreen};
`;

const renderFromTitle = function(props){
    return (
        <FieldWrapper>
            <FormH3>{props.children}</FormH3>
            <Paragraph>A * indicates a required field</Paragraph>
        </FieldWrapper>
    );
};

export default renderFromTitle;