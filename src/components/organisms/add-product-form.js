import React, { useState } from 'react'
import styled from 'styled-components'
import { addProduct, addReferal, getOneProduct } from '../../utils/api'
import InputWithLabel from '../molecules/form/input-with-label'
import MultiSelectButtons from '../molecules/form/multi-select-buttons'
import RadioButtons from '../molecules/form/radio-buttons'
import SubmitButton from '../molecules/form/submit-button'
import CheckBox from '../molecules/form/checkbox-with-label'
import ConfirmationDisplay from '../molecules/confirmation-display'
import FormTitle from '../molecules/form/form-title'

const ProductForm = styled.form`

`;

const ErroMessage = styled.div`
    color: red;
`;

const renderProductForm = function(props){
    
    const [cardAnnualFee, setCardAnnualFee] = useState("");
    const [cardIntroBonus, setCardIntroBonus] = useState("");
    const [cardIssuer, setCardIssuer] = useState("");
    const [cardRewardType, setCardRewardType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [includeReferal, setIncludeReferal] = useState(false);
    const [name, setName] = useState("");
    const [productName, setProductName] = useState("");
    const [productTags, setProductTags] = useState([]);
    const [referalIdentifierType, setReferalIdentifierType] = useState("");
    const [referalIdentifier, setReferalIdentifier] = useState("");
    const [isProductAdded, setIsProductAdded] = useState(false);
    


    //Checks form validity asynchronously to allow for quick database lookups if needed
    function checkFormValidity(){
        return new Promise((resolve, reject) => {
            //Check to see an input product name
            if (!productName){
                reject("Please input a Product Name")
            }
            //Check to see an input company name
            if (!companyName) {
                reject("Please input a Company Name");
            }
            //Tags can be empty as of right now

            //Check for the referal type and either the Referal Number or Referal Url
            if (!referalIdentifierType){
                reject("Please indicate a referal type");
            } else {
                if (!referalIdentifier) {
                    reject ("Please input an example Referal URL or Code")
                }
                else {
                    if (referalIdentifierType === "url"){
                        //reject("Please input an example referal URL");
                    }
                    else if (referalIdentifierType === "code"){
                        //reject("Please input an example referal code");
                    }
                }
            }
            //Check if that product and company combination already exists, if not, return true
            getOneProduct(productName, companyName)
            .then((product) => {
                if (product){
                    reject(`The Product: ${productName} for company: ${companyName} already exists.`);
                } else {
                    resolve(true);
                }
            });
        });
    }

    //Controlled Component Functionality for Annual Fee
    function handleAnnualFeeChange(value){
        setCardAnnualFee(value);
    }
    //Functionality for Intro Bonus
    function handleIntroBonusChange(value){
        setCardIntroBonus(value);
    }
    //Functionality for card Issuer
    function handleIssuerChange(value){
        setCardIssuer(value);
    }
    //Functionality for reward type
    function handleRewardTypeChange(value){
        setCardRewardType(value);
    }
    //Functionality for Product Input
    function handleProductNameChange(value){
        setProductName(value);
    }
    //Functionality for Product Input
    function handleCompanytNameChange(value){
        setCompanyName(value);
    }

    //functionality for Name Input
    function handleNameChange(value){
        setName(value);
    }
    //Functionality for URL or CODE buttons
    function handleReferalIdentifierClick(value){
        setReferalIdentifierType(value);
    }
    //Functionality for Include Referal Checkbox
    function handleIncludeReferalClick(){
        //Reset Referal Name
        setName("")
        //Toggle button
        setIncludeReferal(!includeReferal);
    }
    //Functionality for multiselect checkboxes
    function handleProductTagClick(tag){
        let tagsClone = productTags.splice(0);
        const tagsIndex = tagsClone.indexOf(tag);
        if (tagsIndex >= 0) tagsClone = tagsClone.splice(tagsIndex + 1, 1);
        else tagsClone.push(tag);
        setProductTags(tagsClone);
    }
    //Functionality for Referal Number input
    function handleReferalIdentifierChange(value){
        setReferalIdentifier(value);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        checkFormValidity()
        .then(() => {
            //Form is valid, submit
            //Find out which type of referal it is
            const usesCode = (referalIdentifierType === "code") ? true : false;
            //Product object to be added
            const product = {
                name: productName,
                company: companyName,
                tags: productTags,
                referalIdentifier: referalIdentifier,
                usesCode: (referalIdentifierType === "code") ? true : false,
                //image: image
                cardDetails: (productTags.includes("card") ? {
                    annualFee: "$" + cardAnnualFee,
                    introBonus: cardIntroBonus,
                    issuer: cardIssuer,
                    rewardType: cardRewardType
                } : {})
            };

            //Add Product
            addProduct(product)
            .then((newProduct) => {
                console.log(newProduct);
                //If they are looking to add a referal for this product, do that as well with the preferred flag set
                if (includeReferal){
                    //Referal object to be added
                    const referal = {
                        productID: newProduct._id,
                        name: name || "Someone...",
                        referalIdentifier: referalIdentifier,
                        preferred: true
                    };
                    //Add the feral
                    addReferal(referal)
                    .then((newReferal) => {
                        console.log(newReferal);
                        setIsProductAdded(true);
                    });
                } else {
                    setIsProductAdded(true);
                }
            });
        })
        .catch((err) => {
            //Form is invalid, set error message
            setErrorMessage(err);
        });
    }


    return (
        <div>
            <FormTitle>Add a Products</FormTitle>
            {
                (!isProductAdded) ? <ProductForm>
                    <InputWithLabel
                        inputValue={companyName}
                        labelValue="Company Name"
                        id="CompanyName"
                        onChange={handleCompanytNameChange}
                        required={true}
                        type="text"/>
                    <InputWithLabel
                        inputValue={productName}
                        labelValue="Product Name"
                        id="ProductName"
                        onChange={handleProductNameChange}
                        required={true}
                        type="text"/>
                    <RadioButtons
                        buttons={[{
                            name: "URL",
                            value: "url"
                        }, {
                            name: "Code",
                            value: "code"
                        }]}
                        labelValue="Referal Type"
                        onButtonClick={handleReferalIdentifierClick}
                        required={true} />
                    <InputWithLabel
                        disabled={(referalIdentifierType) ? false : true}
                        onChange={handleReferalIdentifierChange}
                        id="referalIdentifier"
                        inputValue={referalIdentifier}
                        labelValue="Example Referal Number for this product"
                        required={true}
                        type="text" />
                    <MultiSelectButtons
                        buttons={[{
                            name: "Credit Card",
                            value: "card"
                        },{
                            name: "Online Service",
                            value: "service"
                        }]}
                        labelValue="Select All Tags that Apply"
                        onButtonClick={handleProductTagClick}
                        required={true}
                        />
                    {
                        (productTags.includes("card")) ?
                            <div>
                                <InputWithLabel
                                    onChange={handleAnnualFeeChange}
                                    id="annualFee"
                                    inputValue={cardAnnualFee}
                                    labelValue="Annual Fee for card"
                                    placeholder=""
                                    required={true}
                                    type="number" />
                                <InputWithLabel
                                    onChange={handleIntroBonusChange}
                                    id="introBonus"
                                    inputValue={cardIntroBonus}
                                    labelValue="Intro Bonus for Card"
                                    placeholder=""
                                    required={true}
                                    type="number" />
                                <InputWithLabel
                                    onChange={handleRewardTypeChange}
                                    id="rewardsType"
                                    inputValue={cardRewardType}
                                    labelValue="THIS SHOULD BE A DROPDOWN Rewards Types (i.e. Points, Cash Back, Miles)"
                                    placeholder=""
                                    required={true}
                                    type="text" />
                                <InputWithLabel
                                    onChange={handleIssuerChange}
                                    id="cardIssuer"
                                    inputValue={cardIssuer}
                                    labelValue="THIS SHOULD BE A DROPDOWN Card Issuer (i.e. Mastercard, Visa, Discover, Amex)"
                                    placeholder=""
                                    required={true}
                                    type="text" />
                            </div>
                            : null
                    }
                    <CheckBox
                        id="Include Referal"
                        isChecked={includeReferal}
                        labelValue="Include a referal"
                        onChange={handleIncludeReferalClick}
                    ></CheckBox>
                    {
                        (includeReferal) ?
                        <InputWithLabel
                            id="Name"
                            inputValue={name}
                            labelValue="Name"
                            placeholder="Your Name. Could be anything!"
                            onChange={handleNameChange}
                            toolTip="Name is only used as astetic. We have no desire to collect your information. Put anything you want (as long as its appropriate)."
                            type="text" />
                        : null
                    }
                    {
                        (errorMessage) ? <ErroMessage>{errorMessage}</ErroMessage> : null
                    }
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </ProductForm>
                : <ConfirmationDisplay
                    message="Thanks!"
                    explanation="Your referal is boosted" />
            }
        </div>
        
    )
}

export default renderProductForm;