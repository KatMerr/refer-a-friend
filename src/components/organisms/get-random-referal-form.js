import React, { useState, useEffect}  from 'react'
import SpinningList from '../spinning-list'
import styled from 'styled-components'
import { getAllProducts, updateReferal, getReferalsForProduct } from '../../utils/api'
import InputWithProductlist from '../molecules/input-with-productlist'
//Need to close the dropdown menu when the fields is clicked out of. Currently brakes if hovered over the list then tabs away with current method




const Form = styled.form`
    border: 4px white solid;
    border-radius: 20px;
` 

function RandomReferalForm() {
    
    const [referalProducts, setReferalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productInput, setProductInput] = useState("");
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedReferal, setSelectedReferal] = useState({});
    const [areNoReferals, setAreNoReferals] = useState(false);
    const namesArray = ["Jim", "James", "Bobby", "Liquor", "Cat", "Lemony"];
    const [randomNames, setRandomNames] = useState(namesArray);
    let isGettingReferal = false;

    useEffect(() => {
        //Get a list of all possible products
        getAllProducts()
        .then((data) => {
            let firstTen = data.slice(0, 10);
            //Referal products works as a const for all products
            setReferalProducts(data);
            //Filtered products is based off user input
            setFilteredProducts(firstTen);
        });
    }, []);

    function clearProduct(e){
        e.preventDefault();
        setProductInput("");
        setSelectedProduct(null);
        setSelectedReferal({});
        setFilteredProducts(referalProducts.slice(0, 10));
    }
    
    function handleProductInput(productName){
        //Controlled Component Functionality
        setProductInput(productName);
        //Filtered Product List
        const lowerCaseProductName = productName.toLowerCase();
        setFilteredProducts(referalProducts.filter(prod => prod.name.toLowerCase().includes(lowerCaseProductName)).slice(0, 10))
    }
    
    function handleProductClick(product){
        //Set the input value
        setProductInput(product.name);
        //Show selected product
        setSelectedProduct(product);
    }
    
    function handleGetRandomReferal(e){
        e.preventDefault();
        getRandomReferal(selectedProduct);
    }
    
    function handleReferalClick(e){
        //Prevent the normal redirect action
        e.preventDefault();
    
        //Open a new window to the provided
        var refWindow = window.open(selectedReferal.referal_URL, "_blank");
        refWindow.focus();
    
        //Incriment the referal link 'clicked' value and post the updated doc
        let updatededReferal = selectedReferal;
        updatededReferal.meta.clicked = updatededReferal.meta.clicked + 1;
        updateReferal(selectedProduct._id, updatededReferal)
        .then((updatedReferal) => {
            console.log(updatedReferal);
        });
    }
    
    function getRandomReferal(product){
        if (!isGettingReferal){
            //To prevent multiple clicks, set isGettingReferal to true
            isGettingReferal = true;
            //Get all referals for a product
            getReferalsForProduct(product._id)
            .then((referals) => {
                //If there are any referals, get one randomly
                if (referals.length) {
                    //Set the no referals flag to false
                    setAreNoReferals(false);
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
                    setRandomNames([{name: randomReferal.name, isSelected: true}, ...namesArray]);
    
                    //Update the randomly selected referal's roll count, and submit that back to the DB
                    randomReferal.meta.rolled = randomReferal.meta.rolled + 1;
                    updateReferal(product._id, randomReferal)
                    .then((updatedReferal) => {
                        //Set referal to updated roll referal
                        setSelectedReferal(updatedReferal);
                        console.log(updatedReferal);
                        //Referal updating is done, allow the user to click again 
                        isGettingReferal = false;
                    });
                } else {
                    //If there aren't any referal, set the no referals flag to true
                    setAreNoReferals(true);
                }
            });
        }
    }


    return (
        <Form>
            <InputWithProductlist 
                value={productInput} 
                onInputChange={(e) => handleProductInput(e.target.value)} 
                placeholder="Search for a product here"
                handleProductClick={handleProductClick}
                products={filteredProducts} />
            <button onClick={clearProduct} >Clear Product</button>
            {
                (selectedProduct) ? <div>
                    <div><img src={selectedProduct.image} alt="" /></div>
                    <div><span>Annual Fee:</span><span>{selectedProduct.annualFee}</span></div>
                    <div><span>Intro Bonus:</span><span>{selectedProduct.introBonus + " " + selectedProduct.rewardType}</span></div>
                    <div><span>Card Name:</span><span>{selectedProduct.name}</span></div>
                    <div><span>Issuer:</span><span>{selectedProduct.issuer}</span></div>
                    <button onClick={handleGetRandomReferal}>Get Random Referal</button>
                </div> : null
            }
            {
                (Object.keys(selectedReferal).length) ? <div>
                    <div>Thanks for helping out <SpinningList items={randomNames}></SpinningList>
                    </div>
                    <div><button onClick={handleReferalClick}>Click here to use the Referal!</button> <a href={selectedReferal.referal_URL}>{selectedReferal.referal_URL}</a></div>
                    <div>Amount of times Rolled: {selectedReferal.meta.rolled}</div>
                    <div>Amount of times clicked: {selectedReferal.meta.clicked}</div>
                    </div> : null
            }
        </Form>
    )
}

export default RandomReferalForm;

