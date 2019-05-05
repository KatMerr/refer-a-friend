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
    const [ toNewReferal, setToNewReferal ] = useState(false);

    
    useEffect(() => {
        const referalID = QueryString.parse(props.location.search).referalID;
        if (referalID){
            getOneReferal(referalID)
            .then((referal) => {
                if (referal) setReferal(referal);
                getOneProductByID(referal.product)
                .then((prod) => {
                    setProduct(prod);
                    setIsLoading(false);
                })
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    return(
        (!isLoading) ?
            (referal && !toNewReferal) ?
                <>
                    <H2>Thanks {referal.name}!</H2>
                    <P>Our process is completely random, and unfortuantely, since we don't wish to collect sensitive data, we have no way of cotnacting you if someone uses your referal. Hopefully, though you'll end up with a nice surprise someday!</P>
                    <ButtonRow>
                        <Button onClick={() => setToNewReferal(true)} variant="secondary">Submit Another Referal</Button>
                    </ButtonRow>
                    <P>Product Submitted For: {product.name}<br />
                        Referal Amount: {referal.referalAmount || "Nothing"}<br />
                        Name: {referal.name || "Someone..."}</P>
                </>
            : <Redirect to="/add-referal" />
        : null
    )
}

export default withRouter(AddReferalConfirmation);