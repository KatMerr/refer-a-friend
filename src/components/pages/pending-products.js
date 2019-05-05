import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MenuWithDisplay from '../organisms/dashboard'
import { getAllPendingProducts } from '../../utils/api-calls'
import { Breakpoints } from '../../utils/style-globals'

const PendingProducts = styled.div`
    max-width: ${Breakpoints.max};
    border: 1px solid black;
    margin-top: 20px;
`;

function renderPendingProducts(props){

    const [items, setItems] = useState();
    useEffect(() => {
        getAllPendingProducts()
        .then((products) => setItems(products));
    }, [])
    return (

        <PendingProducts>
            {(items) ?
                <MenuWithDisplay items={items} />
                : <div>No Items</div>
            }
        </PendingProducts>
    )
}

export default renderPendingProducts;