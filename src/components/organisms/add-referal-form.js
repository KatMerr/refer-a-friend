import React, { useState, useEffect } from 'react'
import { getAllApprovedProducts, addReferal } from '../../utils/api-calls'
import { withRouter, Redirect } from 'react-router-dom'
import QueryString from 'query-string'
import Form from '../atoms/form'
import Error from '../atoms/error'
import InputWithItemList from '../molecules/form/input-with-item-list'
import InputWithLabel from '../molecules/form/input-with-label'
import SubmitButton from '../molecules/form/submit-button'
import FormTitle from '../molecules/form/form-title'
import { isBadWord, doUrlsMatch } from '../../utils/helpers'

const renderReferalForm = function(props){
    
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [product, setProduct] = useState("");
    const [referalIdentifierType, setReferalIdentifierType] = useState("");
    const [referalNumber, setReferalNumber] = useState("");
    const [referalURL, setReferalURL] = useState("");
    const [referalProducts, setReferalProducts] = useState([]);
    const [referalValue, setReferalValue] = useState("");
    const [referalID, setReferalID] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReferalSubmitted, setIsReferalSubmitted] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();

    /*On mount, 
        1) Get All Approved products
        2) Check if there is a productID being passed through query props, and default to that one */
    useEffect(() =>{
        const defaultProductID = QueryString.parse(props.location.search).productID;
        getAllApprovedProducts()
        .then((products) => {
            setReferalProducts(products);
            if (defaultProductID){
                const defaultProduct = products.find((product) => {
                    return product._id === defaultProductID;
                });
                setSelectedProduct(defaultProduct || "");
                setProduct(defaultProduct.name || "");
            }
        });
    }, []);
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
    //Checks form validity asynchronously using a Promise to allow for quick database lookups
    function checkFormValidity(){
        return new Promise((resolve, reject) => {
            //Check for a selectedProduct
            if (selectedProduct === undefined) reject("Please selected a Product to submit a referal too.");
            //If they input a name, make sure its appropriate
            if (name && isBadWord(name)) reject("Come on man, no bad words"); 
            //Check their referal
            if (selectedProduct.usesCode && !referalNumber){
                //Reject if its asking for a code and none is input
                reject("Please eneter your Referal Number");
            } else if (!selectedProduct.usesCode){
                if (!referalURL){
                    //Reject if its asking for a URL and non is input
                    reject("Please enter your referal URL");
                } else if(selectedProduct.referalIdentifier) {
                    //Reject if their input URL is not the expected URL from the product.
                    if (!doUrlsMatch(selectedProduct.referalIdentifier, referalURL)) reject("Input URL doesn't match expected URL");
                }
            }
            resolve();
        });
    }
    //Handles functionality for for submission
    function handleSubmit(e){
        //Prevent the redirect
        e.preventDefault();
        setIsSubmitting(true);
        checkFormValidity()
        .then(() => {
            //Form is valid
            //Create Referal Object (name, product ID, and either the referal code or referal URL)
            const referal = {
                name: name || "Someone...",
                productID: selectedProduct._id,
                referalIdentifier: (referalNumber || referalURL)
            };
            //Add it to the DB and show confirmation message
            addReferal(referal)
            .then((newReferal) => {
                console.log(newReferal);
                setReferalID(newReferal._id);
                setIsReferalSubmitted(true);
            });
        })
        .catch((err) => {
            //Form is invalid
            //Set Error message
            setErrorMessage(err);
        })
        .finally(() => setIsSubmitting(false));
    }

    return (
        <>
            {
                (!isReferalSubmitted) ? 
                <Form>
                    <FormTitle>Add Referal</FormTitle>
                    <InputWithItemList
                        handleItemClick={handleProductListClick} includeLabel={true}
                        value={product} label="Product"
                        listItems={referalProducts} id="ProductList" onChange={setProduct}
                        placeholder="Search for a product here" required={true} />
                    <InputWithLabel
                        onChange={setName} id="NameInput"
                        value={name} label="Name to Display"
                        maxLength={50} placeholder="Name"
                        toolTip="Name is only used as astetic. We have no desire to collect your information. Put anything you want (as long as its appropriate)."
                        type="text" />
                    <InputWithLabel
                        onChange={setReferalValue} id="ValueInput"
                        value={referalValue} label="Referal Amount"
                        min={0} placeholder="Referal Amount"
                        toolTip="Amount of Points, Miles, or Cash Back earned when a referal form is completed."
                        type="number" />
                    {
                        (referalIdentifierType) ?
                            (referalIdentifierType === "url") ?
                                <InputWithLabel
                                onChange={setReferalURL} id="referalURL" value={referalURL}
                                label="Link to Referral Bonus" required={true}
                                toolTip={"Link is expected to look something like this: \"" + selectedProduct.referalIdentifier + "/a1b2c3\""}
                                type="text" />
                                : <InputWithLabel onChange={setReferalNumber}
                                id="referalNumber" value={referalNumber}
                                label="Referal Number"  required={true}
                                type="text" />
                            : null
                    }
                    {
                        (errorMessage) ? <Error>{errorMessage}</Error> : null
                    }
                    <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting}>Submit</SubmitButton>
                </Form>
                : <Redirect push to={{ pathname: "/add-referal-confirmation", search: `?referalID=${referalID}` }}  />
            }
        </>
        
    )
}

export default withRouter(renderReferalForm);