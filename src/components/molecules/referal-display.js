import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SpinningList from '../atoms/spinning-list'
import ProductTitle from '../atoms/product-title'
import { updateReferal } from '../../utils/api'
import Button from '../atoms/button'

const ReferalDisplay = styled.div`
    
`;

const renderReferalDisplay = function(props){
    let { product, referal } = props;
    let { name, referal_URL, meta } = referal;
    //isReferal simply holds if there is a referal or not. It shouldn't need to be updated beyond the initial mounting
    const isReferal = !!(Object.keys(referal).length);
    //If there is a referal, display the referal window
    if (isReferal){
        //Push the final random name into the random names array for the spinner
        let randomNames = ["Chimpy", "Sandy", "Lucky", "Prince", "Tom"];
        randomNames.push({
            name: name,
            isSelected: true
        });
    
        function handleReferalClick(e){
            //Prevent the normal redirect action
            e.preventDefault();

            //This needs to check if the product is using either referal code or is valid URL, for now its just a URL
        
            //Open a new window to the referal
            var refWindow = window.open(referal_URL, "_blank");
            refWindow.focus();
        
            //Incriment the referal link 'clicked' value and post the updated doc
            let updatededReferal = props.referal;
            updatededReferal.meta.clicked = updatededReferal.meta.clicked + 1;
            updateReferal(product._id, updatededReferal)
            .then((updatedReferal) => {
                console.log(updatedReferal);
            });
        }
    
        return(
            <ReferalDisplay>
                <ProductTitle>Thanks for helping out <SpinningList items={randomNames}></SpinningList></ProductTitle>
                <Button onClick={handleReferalClick}>Click here to use the referal!</Button>
                <div>Amount of times Rolled: {meta.rolled}</div>
                <div>Amount of times clicked: {meta.clicked}</div>
            </ReferalDisplay>
        );
    } else {
        //If there isn't a referal, display the no referal window
        return ( <div>No Referal :(</div>)
    }
};

renderReferalDisplay.defaultProps = {

};

renderReferalDisplay.propTypes = {
    product: PropTypes.object.isRequired,
    referal: PropTypes.object.isRequired
};

export default renderReferalDisplay;