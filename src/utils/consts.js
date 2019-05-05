export const ProductTypes = {
    "Credit_Card": "card",
    "Online_Service": "online"
};

export const ReferalTypes = {
    "URL": "url",
    "Referal_Code": "code"
};

export const RewardTypes = {
    "Cash_Back": "cash",
    "Miles": "miles",
    "Points": "points"
}

export const Issuers = {
    "Visa": "visa",
    "Mastercard": "mastercard",
    "Discover": "discover",
    "American_Express": "amex"
}

export const jwtTokenName = "jwtTokenReferAFriend";

export const primaryNavigation = [{
    path: "/",
    name: "Home"
}, {
    path: "/add-referal",
    name: "Add Referal"
}, {
    path: "/add-product",
    name: "Add Product"
}];

export const dashboardNavigation = [{
    path: "/logout",
    name: "Logout"
}, {
    path: "/pending-products",
    name: "Pending Products"
}, {
    path: "/pending-referals",
    name: "Pending Referals"
}];