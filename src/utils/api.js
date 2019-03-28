import fetch from 'isomorphic-fetch'

function checkAndReturnJSON(res, errMessage){
    if(res.ok) { return res.json(); }
    throw new Error(errMessage);
}

export const isomorphicCall = (path, errMessage, method = "GET", headers = {}, body = null) => {
    if (path){
        return fetch(path, {
            method: method, 
            headers: headers,
            body: body
        }).then((res) => checkAndReturnJSON(res, errMessage));
    } else {
        throw new Error("No Path Specified for isomorphicFetch")
    }
}

export const getAllProducts = () => {
    return isomorphicCall("/api/products", "Couldn't retrieve all Products");
}

export const getReferalsForProduct = (productID) => {
    if (productID){
        return isomorphicCall(`/api/referals/${productID}`, `Couldn't retrieve Referals for Product ID: ${productID}`);
    } else {
        throw new Error("productID doesn't exist")
    }
}

export const updateReferal = (productID, referalToUpdate) => {
    if (typeof(referalToUpdate) === 'object'){
        const refID = referalToUpdate._id;
        const body = JSON.stringify(referalToUpdate);
        return isomorphicCall(`/api/referals/${productID}/${refID}`, `Couldn't update Referal with ID: ${refID}`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw new Error("referalToUpdate isn't an object.")
    }
    
}