import React from 'react'
import styled from 'styled-components'
import AddReferalForm from '../organisms/add-referal-form'

const FormContainer = styled.div`
`;

const AddReferal = function() {
    return (
        <FormContainer>
            <AddReferalForm></AddReferalForm>
        </FormContainer>
    );
}

export default AddReferal;