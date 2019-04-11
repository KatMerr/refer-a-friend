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

export const getOneProduct = (productName = "", companyName = "") => {
    return isomorphicCall(`/api/products/${productName}/${companyName}`, `Couldn't retrieve ${productName}`);
}

export const getAllApprovedProducts = () => {
    return isomorphicCall("/api/products", "Couldn't retrive Approved Products")
            .then((products) => {
                //Once we're able to approve new products, reinstate this line
                //return products.filter((product) => !product.pending);
                return products;
            });
}

export const getAllPendingProducts = () => {
    return isomorphicCall("/api/products", "Couldn't retrieve Pending Products")
           .then((products) => {
               return products.filter((product) => product.pending);
           });
}

export const getReferalsForProduct = (productID = "") => {
    if (productID){
        return isomorphicCall(`/api/referals/${productID}`, `Couldn't retrieve Referals for Product ID: ${productID}`);
    } else {
        throw new Error("Error getting Product Referals: No Product ID supplied")
    }
}

export const updateReferal = (productID = "", referalToUpdate = {}) => {
    if (typeof(referalToUpdate) === 'object'){
        const refID = referalToUpdate._id;
        const body = JSON.stringify(referalToUpdate);
        return isomorphicCall(`/api/referals/${productID}/${refID}`, `Couldn't update Referal with ID: ${refID}`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw new Error("Error updating referal: Invalid JSON");
    }
}

export const addReferal = (referal = {}) => {
    if (typeof(referal) === 'object'){
        const body = JSON.stringify(referal);
        return isomorphicCall(`/api/referals`, `Couldn't submit new referal`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw new Error("Error submitting new referal: Invalid JSON");
    }
}

export const addProduct = (product = {}) => {
    if (typeof(product) === 'object'){
        console.log(product);
        const body = JSON.stringify(product);
        return isomorphicCall(`/api/products`, `Couldn't submit new product`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw new Error("Error submitting new product: Invalid JSON");
    }
}