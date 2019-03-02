import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Title from '../atoms/title'
import fetch from 'isomorphic-fetch'

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


function HomePage() {
    
    const [referalOptions, setReferalOptions] = useState([]);

    useEffect(() => {
        /*fetch("/api/products",{
            method: 'GET'
        }).then((res) => {
            if (res.ok){
                console.log(res.json);
                return res.json();
            } else {
                throw new Error("Couldn't get Options");
            }
        });*/
        setReferalOptions([
            "Name 1",
            "Name 2",
            "Name 3",
            "Name 4"
        ]);
    }, []);
    return (
        <AppContainer>
            <AppContent>
                <HomePageContainer>
                    <Title heading="Refer-A-Friend" />
                    <Paragraph>
                        This site is used to help people fulfill their refer a friend bonus.
                    </Paragraph>
                    <Form>
                        <input list="products" id="product" />
                        <datalist id="products">
                            {
                                referalOptions.map((option, i) => <option value={option} key={i} />)
                            }
                        </datalist>
                    </Form>
                </HomePageContainer>
            </AppContent>
        </AppContainer>
    );
};

export default HomePage;