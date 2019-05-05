import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { addProduct, addReferal, getOneProductByName, addImage } from '../../utils/api-calls'
import Form from '../atoms/form'
import Error from '../atoms/error'
import H2 from '../atoms/h2'
import P from '../atoms/paragraph'
import InputWithLabel from '../molecules/form/input-with-label'
import DropdownWithLabel from '../molecules/form/dropdown-with-label'
import MultiSelectButtons from '../molecules/form/multi-select-buttons'
import RadioButtons from '../molecules/form/radio-buttons'
import SubmitButton from '../molecules/form/submit-button'
import CheckBox from '../molecules/form/checkbox-with-label'
import ImagesUpload from '../molecules/form/upload-images'
import FormTitle from '../molecules/form/form-title'
import { isBadWord, enumToArray } from '../../utils/helpers'
import { ProductTypes, ReferalTypes, RewardTypes, Issuers } from '../../utils/consts'

const renderProductForm = function(props){
    
    const [cardAnnualFee, setCardAnnualFee] = useState("");
    const [cardIntroBonus, setCardIntroBonus] = useState("");
    const [cardIssuer, setCardIssuer] = useState("");
    const [cardRewardType, setCardRewardType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [includeReferal, setIncludeReferal] = useState(false);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [productID, setProductID] = useState("");
    const [referalID, setReferalID] = useState("");
    const [productImage, setProductImage] =  useState("");
    const [productName, setProductName] = useState("");
    const [productTags, setProductTags] = useState([]);
    const [referalAmount, setReferalAmount] = useState("");
    const [referalIdentifierType, setReferalIdentifierType] = useState("");
    const [referalIdentifier, setReferalIdentifier] = useState("");

    //Functionality for Product Image
    const handleProductImageChange = (files) => setProductImage(files[0]);
    //Functionality for Include Referal Checkbox
    const handleIncludeReferalClick = () => {
        //Reset Referal Name
        setName("");
        //Toggle button
        setIncludeReferal(!includeReferal);
    }

    //Checks form validity asynchronously to allow for quick database lookups if needed
    function checkFormValidity(){
        return new Promise((resolve, reject) => {
            //Check to see an input product name
            if (!productName) reject("Please input a Product Name");
            //Check to see an input company name
            if (!companyName) reject("Please input a Company Name");

            //Tags can be empty as of right now

            //Check for the referal type and either the Referal Number or Referal Url
            if (!referalIdentifierType){
                reject("Please indicate a referal type, either a URL or Referal Code");
            } else {
                if (!referalIdentifier) {
                    reject ("Please input an example Referal URL or Code")
                }
            }
            //Check if there is a name input and if that name is a bad word
            if (name && isBadWord(name)) reject("Come on Man");
            
            //Check if that product and company combination already exists, if not, return true
            getOneProductByName(productName, companyName)
            .then((product) => {
                if (product){
                    reject(`The Product: ${productName} for company: ${companyName} already exists.`);
                } else {
                    resolve(true);
                }
            });
        });
    }
    
    function handleSubmit(e){
        e.preventDefault();
        setIsSubmitting(true);
        checkFormValidity()
        .then(async () => {
            let imageURL = "";
            let publicID = "";
            //Form is valid, submit
            //If there is an image, post the image first, get the url of the image on the response to be used for the Products database
            if (productImage){
                await addImage(productImage)
                      .then((image) => {
                        imageURL = image.url;
                        publicID = image.public_id;
                      });
            }
            //Product object to be added
            const product = {
                name: productName,
                company: companyName,
                tags: productTags,
                referalIdentifier: referalIdentifier,
                usesCode: (referalIdentifierType === "code") ? true : false,
                image: {
                    imageURL: imageURL,
                    publicID: publicID
                },
                cardDetails: (productTags.includes(ProductTypes.Credit_Card)) ? {
                    annualFee: cardAnnualFee,
                    introBonus: cardIntroBonus,
                    //Issuer and reward Type may be having problems, need to check
                    issuer: cardIssuer,
                    rewardType: cardRewardType
                } : {},
                pending: true
            };

            //Add Product
            addProduct(product)
            .then((newProduct) => {
                //Set the product ID to be used in the redirect to the confirmation screen
                setProductID(newProduct._id);
                //If they are looking to add a referal for this product, do that as well with the preferred flag set
                if (includeReferal){
                    //Referal object to be added
                    const referal = {
                        productID: newProduct._id,
                        name: name || "Someone...",
                        referalAmount: referalAmount,
                        referalIdentifier: referalIdentifier,
                        preferred: true
                    };
                    //Add the referal
                    addReferal(referal)
                    .then((newReferal) => {
                        //Set the referalID to be used in the redirect to the confirmation screen
                        setReferalID(newReferal._id);
                        setIsProductAdded(true);
                    });
                } else {
                    setIsProductAdded(true);
                }
            });
        })
        .catch((err) => setErrorMessage(err))
        .finally(() => setIsSubmitting(false));
    }

    return (
            (!isProductAdded) ? 
            <>
                <Form>
                    <FormTitle>Add a Product</FormTitle>
                    <P>In exchange for entering a product we don't have yet, we will make you the first referal used for that product (if we use your submission, of course).</P>
                    <InputWithLabel
                        value={companyName} label="Company Name"
                        id="CompanyName" onChange={setCompanyName}
                        required={true}  type="text"/>
                    <InputWithLabel
                        value={productName} label="Product Name"
                        id="ProductName" onChange={setProductName}
                        required={true} type="text"/>
                    <ImagesUpload
                        accept={[".png", ".gif", ".jpg"]}  id="ProductImage"
                        label="Product Image" maxSize={.5} onChange={handleProductImageChange}
                        toolTip="Image for product. It will help out a bunch"
                        usePreview={true} />
                    <RadioButtons
                        buttons={enumToArray(ReferalTypes)}  label="Referal Type"
                        onButtonClick={setReferalIdentifierType} required={true}
                        value={referalIdentifierType} />
                    <InputWithLabel
                        disabled={(referalIdentifierType) ? false : true}  onChange={setReferalIdentifier}
                        id="referalIdentifier" value={referalIdentifier}
                        label={`Example referal ${referalIdentifierType || "information"} for this product`}
                        required={true} type="text" />
                    <MultiSelectButtons
                        buttons={enumToArray(ProductTypes)}  label="Select All Tags that Apply"
                        onButtonClick={setProductTags} required={true} value={productTags}
                        />
                    {
                        (productTags.includes("card")) ?
                            <>
                                <H2>Basic Credit Card Information</H2>
                                <P>Any additional information you could provide here would be extremely helpful</P>
                                <InputWithLabel
                                    onChange={setCardAnnualFee} id="annualFee"
                                    value={cardAnnualFee} label="Annual Fee for card"
                                    toolTip="In dollars, please." type="number" />
                                <InputWithLabel
                                    onChange={setCardIntroBonus} id="introBonus"
                                    value={cardIntroBonus} label="Intro Bonus for Card"
                                    toolTip="If any fees are waived, indicate so here. EX: 50,000 points, Intro Fee waived first year."
                                    type="text" />
                                <DropdownWithLabel
                                    onChange={setCardRewardType} id="rewardsType"
                                    label="Rewards Type:" options={enumToArray(RewardTypes)}
                                    toolTip="Usually referals come in 3 types, points, miles, or cash back."
                                    value={cardRewardType}/>
                                <DropdownWithLabel
                                    onChange={setCardIssuer} id="cardIssuer"
                                    label="Card Issuer:" options={enumToArray(Issuers)}
                                    type="text" value={cardIssuer} />
                            </>
                            : null
                    }
                    <CheckBox id="Include Referal"
                        isChecked={includeReferal} label="Include a referal"
                        onChange={handleIncludeReferalClick}
                    ></CheckBox>
                    {
                        (includeReferal) ?
                        <>
                            <InputWithLabel
                                id="Name" value={name}
                                label="Name" placeholder="Your Name. Could be anything!"
                                onChange={setName}
                                toolTip="Name is only used as astetic. We have no desire to collect your information. Put anything you want (as long as its appropriate)."
                                type="text" />
                            <InputWithLabel
                                id="ReferalAmount" value={referalAmount}
                                label="Referal Amount" onChange={setReferalAmount}
                                toolTip="Benefit you'll receive if your referal is used."
                                type="number" />
                        </>
                        : null
                    }
                    {
                        (errorMessage) ? <Error>{errorMessage}</Error> : null
                    }
                    <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting}>Submit</SubmitButton>
                </Form>
            </>
            : <Redirect push to={{ pathname: "/add-product-confirmation", search:`?productID=${productID}${(referalID) ? `&referalID=${referalID}` : null}`}} />
        
    )
}

export default renderProductForm;