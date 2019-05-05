import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import QueryString from 'query-string'
import Button from '../atoms/button'
import ButtonRow from '../atoms/button-row'
import H2 from '../atoms/h2'
import P from '../atoms/paragraph'
import { getOneReferal, getOneProductByID } from '../../utils/api-calls'

function AddReferalConfirmation(props){

    const [ referal, setReferal ] = useState();
    const [ product, setProduct ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ toNewProduct, setToNewProduct ] = useState(false);

    
    useEffect(() => {
        const { productID, referalID } = QueryString.parse(props.location.search);
        if (productID){
            getOneProductByID(productID)
            .then((prod) => {
                setProduct(prod);
                if (referalID){
                    getOneReferal(referalID)
                    .then((referal) => {
                        setReferal(referal);
                        setIsLoading(false);
                    })
                } else {
                    setIsLoading(false);
                }
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    return(
        (!isLoading) ?
            (product && !toNewProduct) ?
                <>
                    <H2>Thanks {(referal) ? referal.name : "Friend"}!</H2>
                    { (referal) 
                        ? <P>We really appreciate you helping us out! As a thank you, we've given your referal priority for this product. The first bonus for this product should come from your referal!</P>
                        : <P>Thanks a bunch for helping out! I wish there was more we could do for you, but for now, I'll just call you swell.</P>
                    }
                    <ButtonRow>
                        <Button onClick={() => setToNewProduct(true)} variant="secondary">Submit Another Product</Button>
                    </ButtonRow>
                </>
            : <Redirect to="/add-product" />
        : null
    )
}

export default withRouter(AddReferalConfirmation);