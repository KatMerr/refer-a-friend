import React from 'react'
import styled from 'styled-components'

const Label = styled.label`

`

function Label(props){
    return (
        <Label htmlFor={props.name}>{props.title}</Label>
    )
}

export default Label