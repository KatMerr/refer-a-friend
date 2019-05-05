import fetch from 'isomorphic-fetch'

//Checks and throws if the response has an error property, otherwise returns the response
function checkAndReturnJSON(res){
    if (res && res.hasOwnProperty("error")){
        throw res.error;
    }
    return res;
}
//Generic fetch call
export const isomorphicCall = (path, method = "GET", headers = {}, body = null) => {
    if (path){
        return fetch(path, {
            method: method, 
            headers: headers,
            body: body
        }).then(res => res.json())
        .then(checkAndReturnJSON);
    } else {
        //Need to rewrite all thrown errors like this
        const err = "No Path Sepcified for Fetch";
        throw err;
    }
}
///////////////////////PRODUCTS PRODCUTS//////////////////////////////////////
//Returns the entire list of Products
export const getAllProducts = () => {
    return isomorphicCall("/api/products");
}
//Returns One Product found via ID
export const getOneProductByID = (productID = "") => {
    if (productID) {
        return isomorphicCall(`/api/products/${productID}`);
    } else {
        throw "Error getting product: No ID Provided"
    }
}
//Returns One Product found via It's name and Company Name
export const getOneProductByName = (productName = "", companyName = "") => {
    return isomorphicCall(`/api/products/${productName}/${companyName}`);
}
//Returns all products that are approved
export const getAllApprovedProducts = () => {
    return isomorphicCall("/api/products")
            .then((products) => {
                return products.filter((product) => !product.pending);
            });
}
//Returns all products that are pending
export const getAllPendingProducts = () => {
    return isomorphicCall("/api/products")
           .then((products) => {
               return products.filter((product) => product.pending);
           });
}
//Adds new Product
export const addProduct = (product = {}) => {
    if (typeof(product) === 'object'){
        const body = JSON.stringify(product);
        return isomorphicCall(`/api/products`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw "Error submitting new product: Invalid JSON";
    }
}
//Updates existing Product
export const updateProduct = (product = {}) => {
    if (typeof(product) === 'object'){
        const body = JSON.stringify(product);
        return isomorphicCall(`/api/products`, "PUT", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw "Error submitting new product: Invalid JSON";
    }
}
/////////////////////REFERALS REFERALS////////////////////////////////
//Returns one referal based on ID
export const getOneReferal = (referalID = "") => {
    if (referalID){
        return isomorphicCall(`/api/referals/${referalID}`, "GET");
    } else {
        throw "Error getting Referal: No ID provided"
    }
}
//Returns all referals for a certain product
export const getReferalsForProduct = (productID = "") => {
    if (productID){
        return isomorphicCall(`/api/referals/product/${productID}`);
    } else {
        throw "Error getting Product Referals: No Product ID supplied";
    }
}
//Adds new referal
export const addReferal = (referal = {}) => {
    if (typeof(referal) === 'object'){
        const body = JSON.stringify(referal);
        return isomorphicCall(`/api/referals`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw "Error submitting new referal: Invalid JSON";
    }
}
//Updates referal based on ID, returns updated referal
export const updateReferal = (referalToUpdate = {}) => {
    if (typeof(referalToUpdate) === 'object'){
        const refID = referalToUpdate._id;
        const body = JSON.stringify(referalToUpdate);
        return isomorphicCall(`/api/referals/${refID}`, "POST", { "Content-Type" : "application/JSON" }, body);
    } else {
        throw "Error updating referal: Invalid JSON";
    }
}
//////////////////////////IMAGES IMAGES/////////////////////////////////////
//Adds new image
export const addImage = (image = {}) => {
    if (typeof(image) === 'object'){
        //Need to check here the proper file type, should only be a valid image format
        const data = new FormData();
        data.append('image', image);
        return isomorphicCall(`/api/images`, "POST", { }, data);
    } else {
        throw "Error upload new image: Invalid File";
    }
}
//Deletes an image
export const deleteImage = (publicID = "") => {
    if (publicID){
        const encodedID = encodeURIComponent(publicID);
        return isomorphicCall(`/api/images/${encodedID}`, "DELETE");
    } else {
        throw "No Public ID provided";
    }
}
/////////////////////////USER USER//////////////////////////////////////////////
//For login, returns the JWT Token
export const getUserToken = (user = {}) => {
    if (typeof(user) === 'object'){
        const { email, password } = user;
        return isomorphicCall(`/api/users/${email}/${password}`);
    } else {
        throw "Error getting user: Invalid JSON";
    }
}