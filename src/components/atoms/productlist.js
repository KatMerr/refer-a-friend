import React from 'react'
import Styled from 'styled-components'

const List = Styled.div`
    max-width: 300px;
    max-height: 500px;
    background-color: white;
    color: black;
    display: block;
    position: absolute;
    overflow: scroll;
    left: 50%;
    transform: translateX(-50%);
`;

const Product = Styled.div`
    padding: 10px 5px;
    border-bottom: 1px solid black;
    cursor: pointer;

    &:hover {
        background-color: blue;
        color: white;
    }
    &:last-of-type{
        border-bottom: none;
    }
`;

function ProductList (props){
    return (
        (props.showList) ? 
            <List onMouseEnter={props.handleMouseEnter} onMouseLeave={props.handleMouseLeave}>
                {
                    (props.products.length) 
                        ? props.products.map((product, i) => <Product key={i} onClick={() => props.handleProductClick(product)}>{product.name}</Product>) 
                        : <Product>Can't find what you're looking for? Click here.</Product>
                }
            </List>
            : null
    );
}

export default ProductList