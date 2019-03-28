import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../atoms/input'
import ProductList from '../atoms/productlist'

const InputRow = styled.div`

`;

const InputWithDataList = (props) => {

    const [isListHoveredOver, setIsListHoveredOver] = useState(false);
    const [showDataList, setShowDataList] = useState(false);

    function handleProductClick(product){
        //On Selecting a Product, first run the function passed in through props
        props.handleProductClick(product);
        //Then hide the Product List
        setShowDataList(false);
    }

    return (
        <InputRow>
            <Input
                id={props.id}
                name={props.name}
                type="text"
                value={props.value}
                onChange={props.onInputChange}
                onFocus={() => setShowDataList(true)}
                onBlur={() => setShowDataList(isListHoveredOver)}
                placeholder={props.placeholder} />
            <ProductList
                showList={showDataList}
                handleMouseEnter={() => setIsListHoveredOver(true)}
                handleMouseLeave={() => setIsListHoveredOver(false)}
                handleProductClick={(productClicked) => handleProductClick(productClicked)}
                products={props.products} />
        </InputRow>
    )
}

export default InputWithDataList

