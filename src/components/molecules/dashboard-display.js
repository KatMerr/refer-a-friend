import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getOneProductByName, addImage, updateProduct, deleteImage } from '../../utils/api-calls'
import PropTypes from 'prop-types'
import H2 from '../atoms/h2'
import Label from '../atoms/label'
import P from '../atoms/paragraph'
import Image from '../atoms/image'
import Button from '../atoms/button'
import ButtonRow from '../atoms/button-row'
import InputWithLabel from '../molecules/form/input-with-label'
import DropdownWithLabel from '../molecules/form/dropdown-with-label'
import MultiSelectButtons from '../molecules/form/multi-select-buttons'
import RadioButtons from '../molecules/form/radio-buttons'
import ImagesUpload from '../molecules/form/upload-images'
import { enumToArray } from '../../utils/helpers'
import { ProductTypes, ReferalTypes, RewardTypes, Issuers } from '../../utils/consts'

const Display = styled.div`
    padding: 20px;
`;

function renderDashboardDisplay(props){
    const { item } = props;
    if (item){
        const { name, company, image, cardDetails, tags, referalIdentifier, usesCode } = item;
        const { annualFee, benefits, introBonus, issuer, rewardType } = cardDetails;
    
        const [cardAnnualFee, setCardAnnualFee] = useState();
        const [cardIntroBonus, setCardIntroBonus] = useState();
        const [cardIssuer, setCardIssuer] = useState();
        const [cardRewardType, setCardRewardType] = useState();
        const [companyName, setCompanyName] = useState();
        const [errorMessage, setErrorMessage] = useState();
        const [isProductUpdated, setIsProductUpdated] = useState(false);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [newProductImage, setNewProductImage] = useState();
        const [prevProductImage, setPrevProductImage] =  useState();
        const [productName, setProductName] = useState();
        const [productTags, setProductTags] = useState();
        const [referalIdentifierType, setReferalIdentifierType] = useState();
        const [refIdentifier, setRefIdentifier] = useState();

        useEffect(() => {
            setCardAnnualFee(annualFee);
            setCardIntroBonus(introBonus);
            setCardIssuer(issuer);
            setCardRewardType(rewardType);
            setCompanyName(company);
            setPrevProductImage(image);
            setProductName(name);
            setProductTags(tags);
            setReferalIdentifierType((usesCode) ? ReferalTypes.URL : ReferalTypes.Referal_Code);
            setRefIdentifier(referalIdentifier);
        }, [item])
    
        //Functionality for Product Image
        const handleProductImageChange = (files) => setNewProductImage(files[0]);

        function checkFormValidity(){
            return new Promise((resolve, reject) => {
                //Check to see an input product name
                if (!productName) reject("Please input a Product Name");
                //Check to see an input company name
                if (!companyName) reject("Please input a Company Name");
                //Product Image
                if (!newProductImage && !prevProductImage) reject("No image selected");
                //Tags can be empty as of right now
                if (!productTags.length) reject("Please add at least 1 tag");
                //Check for the referal type and either the Referal Number or Referal Url
                if (!referalIdentifierType) reject("Please indicate a referal type, either a URL or Referal Code");
                else if (!referalIdentifier) reject ("Please input an example Referal URL or Code")
                
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
                //Form is valid, submit                    

                //If there is a new image, add the new image and delete the old one
                let imageURL = "";
                let publicID = "";
                if (newProductImage){
                    await addImage(newProductImage)
                          .then((image) => {
                              imageURL = image.url;
                              publicID = image.public_id;
                          });
                          deleteImage(prevProductImage.imageURL)
                          .then((result) => {
                              console.log(result);
                          });
                } else {
                    //Otherwise get the information from the old image
                    imageURL = image.imageURL;
                    publicID = image.publicID;
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
                    //Product reviewed, no longer pending
                    pending: false
                };
    
                //Update and confirm the product
                updateProduct(product)
                .then((updatedProduct) => {
                    console.log(updatedProduct);
                    setIsProductUpdated(true);
                });
            })
            .catch((err) => setErrorMessage(err))
            .finally(() => setIsSubmitting(false));
        }

        function handleDelete(e){
            e.preventDefault();
            //Need to install a confirm here
        }
    
        return (
            <Display>
                <InputWithLabel
                    label="Company Name" id="CompanyName"
                    onChange={setCompanyName} required={true}
                    type="text" value={companyName}/>
                <InputWithLabel
                    label="Product Name" id="ProductName"
                    onChange={setProductName} required={true}
                    type="text" value={productName}/>
                <Label>Previous Image</Label>
                <img src={prevProductImage} />
                <ImagesUpload
                    accept={[".png", ".gif", ".jpg"]} id="ProductImage"
                    label="New Image" maxSize={.5}
                    onChange={handleProductImageChange} usePreview={true} />
                <RadioButtons
                    buttons={enumToArray(ReferalTypes)} label="Referal Type"
                    onButtonClick={setReferalIdentifierType} required={true}
                    value={referalIdentifierType} />
                <InputWithLabel
                    disabled={(referalIdentifierType) ? false : true} onChange={setRefIdentifier}
                    id="referalIdentifier"
                    label={`Example referal ${referalIdentifierType || "information"} for this product`}
                    required={true} type="text"
                    value={refIdentifier} />
                <MultiSelectButtons
                    buttons={enumToArray(ProductTypes)} label="Select All Tags that Apply"
                    onButtonClick={setProductTags}
                    required={true} value={productTags} />
                {
                    ((productTags) && productTags.includes(ProductTypes.Credit_Card)) ?   
                    <>
                        <H2>Basic Credit Card Information</H2>
                        <P>Any additional information you could provide here would be extremely helpful</P>
                        <InputWithLabel
                            onChange={setCardAnnualFee} id="annualFee"
                            label="Annual Fee for card" type="number" value={cardAnnualFee} />
                        <InputWithLabel
                            onChange={setCardIntroBonus} id="introBonus"
                            label="Intro Bonus for Card" type="text" value={cardIntroBonus} />
                        <DropdownWithLabel
                            onChange={setCardRewardType} id="rewardsType"
                            label="Rewards Type:" options={enumToArray(RewardTypes)}
                            value={cardRewardType}/>
                        <DropdownWithLabel
                            onChange={setCardIssuer} id="cardIssuer"
                            label="Card Issuer:" options={enumToArray(Issuers)}
                            type="text" value={cardIssuer} />
                    </> : null
                }
                <ButtonRow>
                    <Button onClick={handleSubmit}>Approve Product</Button>
                    <Button onClick={handleDelete} variant="danger">Delete Product</Button>
                </ButtonRow>
            </Display>
        )
    } else {
        return (<div>Nothing selected</div>)
    }
    
}

renderDashboardDisplay.propTypes = {
    selectedItem: PropTypes.object
}

export default renderDashboardDisplay;