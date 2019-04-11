import React from 'react'
import styled from 'styled-components'
import FieldWrapper from '../../atoms/field-wrapper'
import H3 from '../../atoms/h3'

const renderFromTitle = function(props){
    return (
        <FieldWrapper>
            <H3>{props.children}</H3>
        </FieldWrapper>
    );
};

export default renderFromTitle;