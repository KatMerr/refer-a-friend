import React from 'react'
import Styled from 'styled-components'
import Input from '../atoms/input'
import Label from '../atoms/label'

const FormGroup = Styled.div`

`;

function InputWithLabel(props) {
    return (
        <FormGroup>
            <Label props />
            <Input props />
        </FormGroup>
    );
}

export default InputWithLabel;