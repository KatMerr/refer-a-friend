import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getAllProducts, addReferal } from '../../utils/api'
import InputWithItemList from '../molecules/form/input-with-item-list'
import InputWithLabel from '../molecules/form/input-with-label'
import SubmitButton from '../molecules/form/submit-button'
import ConfirmationDisplay from '../molecules/confirmation-display'
import FormTitle from '../molecules/form/form-title'

const ReferalForm = styled.form`

`;

const renderReferalForm = function(props){
    
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [product, setProduct] = useState("");
    const [referalIdentifierType, setReferalIdentifierType] = useState("");
    const [referalNumber, setReferalNumber] = useState("");
    const [referalURL, setReferalURL] = useState("");
    const [referalProducts, setReferalProducts] = useState([]);
    const [referalValue, setReferalValue] = useState("");
    const [isReferalSubmitted, setIsReferalSubmitted] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();

    useEffect(() =>{
        getAllProducts()
        .then((products) => {
            setReferalProducts(products);
        })
    }, []);

    //Checks form validity asynchronously to allow for quick database lookups if needed
    function checkFormValidity(){
        return new Promise((resolve, reject) => {
            //Check for a selectedProduct
            if (selectedProduct === undefined){
                reject("Please selected a Product to submit a referal too.");
            }
            if (selectedProduct.usesCode && !referalNumber){
                reject("Please eneter your Referal Number");
            } else if (!selectedProduct.usesCode){
                if (!referalURL){
                    reject("Please enter your referal URL");
                } else {
                    //Need to check input URL against the products expected url format
                    //For now, ignore
                }
            }
            resolve();
        });
    }
    //Controlled Component Functionality for Product Input
    function handleProductChange(value){
        setProduct(value);
        //Selected Product reset on value change
        setSelectedProduct();
    }
    //Controlled Component functionality for Product Input List Item Click
    function handleProductListClick(product){
        //Set Selected Product
        setSelectedProduct(product);
        //Set Referal Identifier Type
        if (product.usesCode) setReferalIdentifierType("code");
        else setReferalIdentifierType("url");
        //Set Input value equal to that products name
        setProduct(product.name);
    }
    //Controlled Component functionality for Name Input
    function handleNameChange(value){
        setName(value);
    }
    //Functionality for Referal Value Input
    function handleReferalValueChange(value){
        setReferalValue(value);
    }
    //Controlled Component functionality for Referal Number input
    function handleReferalNumberChange(value){
        setReferalNumber(value);
    }
    //Controlled Component functionality for Referal URL input
    function handleReferalURLChange(value){
        setReferalURL(value);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        //Check if the form is valid
        checkFormValidity()
        .then(() => {
            //Form is valid
            //Create Referal Object
            const referal = {
                name: name || "Someone...",
                productID: selectedProduct._id,
                referalIdentifier: (referalNumber || referalURL)
            };
            //Add it to the DB
            addReferal(referal)
            .then((newReferal) => {
                console.log(newReferal);
                setIsReferalSubmitted(true);
            });
        })
        .catch((err) => {
            //Form is invalid
            //Set Error message
            setErrorMessage(err);
        });
    }


    return (
        <div>
            {
                (!isReferalSubmitted) ? 
                <ReferalForm>
                    <FormTitle>Add Referal</FormTitle>
                    <InputWithItemList
                        handleItemClick={handleProductListClick}
                        includeLabel={true}
                        inputValue={product}
                        labelValue="Product"
                        listItems={referalProducts}
                        id="ProductList"
                        onChange={handleProductChange}
                        placeholder="Search for a product here"
                        required={true} />
                    <InputWithLabel
                        onChange={handleNameChange}
                        id="NameInput"
                        inputValue={name}
                        labelValue="Name to Display"
                        maxLength={50}
                        placeholder="Name"
                        toolTip="Name is only used as astetic. We have no desire to collect your information. Put anything you want (as long as its appropriate)."
                        type="text" />
                    <InputWithLabel
                        onChange={handleReferalValueChange}
                        id="ValueInput"
                        inputValue={referalValue}
                        labelValue="Referal Amount"
                        placeholder="Referal Amount"
                        required={true}
                        toolTip="Amount of Points, Miles, or Cash Back earned when a referal form is completed."
                        type="number" />
                    {
                        (referalIdentifierType) ?
                            (referalIdentifierType === "url") ?
                                <InputWithLabel
                                onChange={handleReferalURLChange}
                                id="referalURL"
                                inputValue={referalURL}
                                labelValue="Link to Referral Bonus"
                                placeholder="Link Plz"
                                required={true}
                                type="text" />
                                : <InputWithLabel
                                onChange={handleReferalNumberChange}
                                id="referalNumber"
                                inputValue={referalNumber}
                                labelValue="Referal Number"
                                required={true}
                                type="text" />
                            : null
                    }
                    {
                        (errorMessage) ? <div>{errorMessage}</div> : null
                    }
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </ReferalForm>
                : <ConfirmationDisplay
                    message={`Thank you ${name} for submitting your referal for the ${selectedProduct.name}`}
                    explanation="Our process is completely random, and unfortuantely, since we don't wish to collect sensitive data, we have no way of cotnacting you if someone uses your referal. Hopefully, though you'll end up with a nice surprise someday!" />
            }
        </div>
        
    )
}

export default renderReferalForm;