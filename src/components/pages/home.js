import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import Title from '../atoms/title'
import fetch from 'isomorphic-fetch'

//Need to close the dropdown menu when the fields is clicked out of. Currently brakes if hovered over the list then tabs away with current method

const AppContainer = styled.div`
    background-color: green;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    color: white;
    font-family: serif;
    overflow: hidden;
`

const AppContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const HomePageContainer = styled.div`
    width: 100%;
    text-align: center;
`

const Paragraph = styled.p`
    font-size: 1rem;
    color: white;
    font-weight: normal;
`

const Form = styled.form`
    border: 4px white solid;
    border-radius: 20px;
` 

const FakeDataList = styled.div`
    max-width: 300px;
    max-height: 500px;
    background-color: white;
    color: black;
    display: none;
    position: absolute;
    overflow: scroll;
    left: 50%;
    transform: translateX(-50%);
`

const FakeOption = styled.div`
    padding: 10px 5px;
    border-bottom: 1px solid black;
    cursor: pointer;

    &:hover {
        background-color: blue;
        color: white;
    }
    &:last-of-type{
        border-bottom: none;
    }

`


function HomePage() {
    
    const [referalProducts, setReferalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDataList, setShowDataList] = useState(false);
    const [productInput, setProductInput] = useState("");
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedReferal, setSelectedReferal] = useState({});
    let isDropdownHoveredOver = false;

    useEffect(() => {
        fetch("/api/products",{
            method: 'GET'
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error("Couldn't get Products");
            }
        }).then((data) => {
            console.log(data);
            setReferalProducts(data);
            setFilteredProducts(data);
        });
    }, []);

    function clearProduct(e){
        e.preventDefault();
        setProductInput("");
        setSelectedProduct(null);
        setFilteredProducts(referalProducts);
    }

    function handleProductBlur(){
        setShowDataList((isDropdownHoveredOver) ? true : false);
    }

    function handleProductInput(productName){
        //Controlled Component Functionality
        setProductInput(productName);
        //Hide or show Custom Datalist
        setShowDataList(!!(productName));
        //Filtered Product List
        const lowerCaseProductName = productName.toLowerCase();
        setFilteredProducts((showDataList) ? referalProducts.filter(prod => prod.name.toLowerCase().includes(lowerCaseProductName)) : [])
    }

    function handleProductClick(product){
        //Set the input value
        setProductInput(product.name);
        //Hide the Custom Datalist
        setShowDataList(false);
        //Show selected product
        setSelectedProduct(product);
    }

    function handleGetRandomReferal(e){
        e.preventDefault();
        getRandomReferal(selectedProduct);
    }

    function getRandomReferal(product){
        const productURL = "/api/referals/" + product._id;
        fetch(productURL, {
            method: 'GET'
        }).then((res) => {
            if (res.ok){
                return res.json();
            } else {
                throw new Error("Couldn't get Referals");
            }
        }).then((referals) => {
            if (referals.length) {
                //If there are referals, randomly select one
                const randomReferalIndex = Math.floor(Math.random() * referals.length);
                setSelectedReferal(referals[randomReferalIndex]);
            }
        });
    }

    return (
        <AppContainer>
            <AppContent>
                <HomePageContainer>
                    <Title heading="Refer-A-Friend" />
                    <Paragraph>
                        This site is used to help people fulfill their refer a friend bonus.
                    </Paragraph>
                    <Form>
                        <input onFocus={() => setShowDataList(true)} onChange={e => handleProductInput(e.target.value)} onBlur={handleProductBlur} value={productInput} />
                        <FakeDataList onMouseEnter={() => isDropdownHoveredOver = true} onMouseLeave={() => isDropdownHoveredOver = false} style={{"display": (showDataList) ? "block" : "none"}}>
                            {filteredProducts.map((Product, i) => {
                                return (
                                    <FakeOption key={i} onClick={() => handleProductClick(Product)} >{Product.name}</FakeOption>
                                )
                            })}
                        </FakeDataList>
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
                            (Object.keys(selectedReferal).length) ? <div>{selectedReferal.name}<a href={selectedReferal.product_identifier.referal_URL}>{selectedReferal.product_identifier.referal_URL}</a></div> : null
                        }
                    </Form>
                </HomePageContainer>
            </AppContent>
        </AppContainer>
    );
};

export default HomePage;