import React from 'react'
import styled from 'styled-components'
import AddProductForm from '../organisms/add-product-form'

const FormContainer = styled.div`
`;

const AddReferal = function() {
    return (
        <FormContainer>
            <AddProductForm></AddProductForm>
        </FormContainer>
    );
}

export default AddReferal;