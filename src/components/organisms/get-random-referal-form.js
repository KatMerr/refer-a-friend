import React, {useState, useEffect}  from 'react'
import styled from 'styled-components'
import { getAllApprovedProducts, updateReferal, getReferalsForProduct } from '../../utils/api'
import InputWithProductlist from '../molecules/form/input-with-item-list'
import GenericProductDisplay from '../molecules/generic-product-display'
import CreditCardDisplay from '../molecules/credit-card-display'
import ReferalDisplay from '../molecules/referal-display'
import Button from '../atoms/button'
//Need to close the dropdown menu when the fields is clicked out of. Currently brakes if hovered over the list then tabs away with current method

const Form = styled.form`
    width: 1000px;
    margin: 0 auto;
`;

const CenteredButton = styled(Button)`
    display: block;
    margin: 0 auto;
`

const RandomReferalForm = function(){
    
    const [gotRandomReferal, setGotRandomReferal] = useState(false);
    const [productInputValue, setProductInputValue] = useState("");
    const [referalProducts, setReferalProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedReferal, setSelectedReferal] = useState({});
    let isGettingReferal = false;
    const PRODUCT_TYPES = {
        CREDIT_CARD : "card",
        GENERIC : "generic"
    };

    useEffect(() => {
        //On Component Mount, get all Products
        getAllApprovedProducts()
        .then((products) => {
            //Referal products works as a master list for all products, filting is done in the Input-with-item-list component
            setReferalProducts(products);
        });
    }, []);
    
    function handleProductListClick(product){
        //Show selected product
        setSelectedProduct(product);
        //Set Input Value
        setProductInputValue(product.name);
    }

    function handleProductInputChange(input){
        //Controlled Component Functionality
        setProductInputValue(input);
    }
    
    function handleGetRandomReferal(e){
        e.preventDefault();
        if (!isGettingReferal){
            //To prevent multiple clicks, set isGettingReferal to true
            isGettingReferal = true;
            //Fetch all the referals for a product
            getReferalsForProduct(selectedProduct._id)
            .then((referals) => {
                //If there are any referals, get one randomly
                if (referals.length) {
                    //Need to implement a priorty flag for referals who helped contribute to the product list
                    //Get the minimum for the amount of clicks a referal has received.
                    const minClickedNum = referals.map(ref => ref.meta.clicked)
                                                    .reduce((min, clicked) => Math.min(min, clicked), Infinity);
                    //Filter out referals that are not at the minimum clicks
                    const refs = referals.filter((referal) => {
                        return referal.meta.clicked === minClickedNum;
                    });
                    //If there are referals, randomly select one
                    const randomReferalIndex = Math.floor(Math.random() * refs.length);
                    let randomReferal = refs[randomReferalIndex];
                    //Update the randomly selected referal's rolled count, and submit that back to the DB
                    randomReferal.meta.rolled = randomReferal.meta.rolled + 1;
                    updateReferal(selectedProduct._id, randomReferal)
                    .then((updatedReferal) => {
                        //Set selected referal to updated referal
                        setSelectedReferal(updatedReferal);
                        //set got random referal after fetching and updating
                        setGotRandomReferal(true);
                        //Referal updating is done, allow the user to click again 
                        isGettingReferal = false;
                    });
                } else {
                    //Even if there were no referals, set the GotRandomReferal flag
                    setGotRandomReferal(true);
                }
            });
        }
    }

    //Reset Form
    function handleReset(e){
        e.preventDefault();
        setSelectedProduct(null);
        setSelectedReferal({});
        setGotRandomReferal(false);
    }

    return (
        <Form>
            {
                (!gotRandomReferal) ?
                    <div>
                        <InputWithProductlist 
                            handleItemClick={handleProductListClick}
                            inputValue={productInputValue}
                            listItems={referalProducts}
                            id="ProductList"
                            onChange={handleProductInputChange}
                            placeholder="Search for a product here" />
                        {
                            
                            (selectedProduct) ? 
                                <div>
                                    {(selectedProduct.tags.indexOf(PRODUCT_TYPES.CREDIT_CARD) > -1) ? <CreditCardDisplay product={selectedProduct} /> : <GenericProductDisplay product={selectedProduct} />}
                                    <CenteredButton onClick={handleGetRandomReferal}>Get Random Referal</CenteredButton>
                                </div>
                                : null
                        }
                    </div>
                : <div>
                    <ReferalDisplay referal={selectedReferal} product={selectedProduct} />
                </div>
            }
        </Form>
    )
}

export default RandomReferalForm;

