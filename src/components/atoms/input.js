import React from 'react'
import styled from 'styled-components'

const Input = styled.input`

`

function InputComp(props){
    return (
        <Input
            id={props.id}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
        />
    )
}

export default InputComp