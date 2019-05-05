import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SpinningList from '../atoms/spinning-list'
import ProductTitle from '../atoms/product-title'
import { updateReferal } from '../../utils/api-calls'
import Button from '../atoms/button'
import ButtonRow from '../atoms/button-row'
import { Redirect } from 'react-router-dom'
import Error from '../atoms/error'
import Code from '../atoms/code'

const StyledProductTitle = styled(ProductTitle)`
    margin: 30px 0;
`;

const renderReferalDisplay = function(props){
    const { getNewReferal, product, referal, resetForm } = props;
    const { name, referalIdentifier } = referal;
    //isReferal simply holds if there is a referal or not. It shouldn't need to be updated beyond the initial mounting
    const isReferal = !!(Object.keys(referal).length);
    //If there is a referal, display the referal window
    if (isReferal){

        const [submittedForReview, setSubmittedForReview] = useState(false);
        const [randomNames, setRandomNames] = useState(["Chimpy", "Sandy", "Lucky", "Prince", "Tom", "Jim", "Timothy", "Chris", "Santa"])
        //Push the final random name into the random names array for the spinner
        useEffect(() => {
            let namesCopy = randomNames.splice(0);
            namesCopy.push(name);
            setRandomNames(namesCopy);
        }, [referal]);
    
        function handleReferalClick(e){
            //Prevent the normal redirect action
            e.preventDefault();
        
            //Open a new window to the referal
            var refWindow = window.open(referalIdentifier, "_blank");
            refWindow.focus();
        
            //Incriment the referal link 'clicked' value and post the updated doc
            let updatededReferal = props.referal;
            updateReferal(product._id, updatededReferal)
            .then((updatedReferal) => {
                console.log(updatedReferal);
            });
        }

        function submitForReview(){
            //Update this referal to be manually reviewed for accuracy
            let newReferal = referal;
            newReferal.underReview = true;
            updateReferal(product._id, newReferal)
            .then((updatedReferal) => {
                console.log(updatedReferal);
                setSubmittedForReview(true);
            });
        }

    
        return(
            <>
                <StyledProductTitle>Thanks for helping out <SpinningList delay={200} items={randomNames}></SpinningList></StyledProductTitle>
                <ButtonRow>
                { (product.usesCode) ? <>Referal Number: <Code>{referalIdentifier}</Code></> : <Button onClick={handleReferalClick}>Click here to use the referal!</Button> }
                    <ButtonRow>
                        <Button onClick={getNewReferal} variant="secondary">Different Referal</Button>
                        <Button onClick={resetForm} variant="secondary">Reset!</Button>
                        <Button onClick={submitForReview} variant="secondary">Something wrong with this referal?</Button>
                    </ButtonRow>
                    { (submittedForReview) ? <Error>Thank you for you're feedback and we apologise for any inconvinience. We'll take a look. Why not try a different referal?</Error> : null }
                </ButtonRow>
            </>
        );
    } else {

        //If there isn't a referal, display the no referal window
        const [isRedirecting, setIsRedirecting] = useState(false);
        function handleAddReferalRedirect(){
            setIsRedirecting(true);
        }
        return ( 
            <>
                {
                    (!isRedirecting) ? 
                    <>
                        <StyledProductTitle>Oh no! There are no referals for this product!</StyledProductTitle>
                        <ButtonRow>
                            <Button onClick={resetForm} variant="primary">Try another Product.</Button>
                            <Button onClick={handleAddReferalRedirect} variant="secondary">Submit a referal for this Product</Button>
                        </ButtonRow>
                    </> : <Redirect push to={{ pathname: "/add-referal", search: `?productID=${product._id}` }}  />

                }
                
            </>
        )
    }
};

renderReferalDisplay.propTypes = {
    getNewReferal: PropTypes.func,
    product: PropTypes.object.isRequired,
    referal: PropTypes.object.isRequired,
    resetReferal: PropTypes.func
};

export default renderReferalDisplay;