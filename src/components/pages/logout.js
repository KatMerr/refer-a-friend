import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { logoutUser } from '../../utils/authentication'

const renderLogout = function() {
    useEffect(() => {
        logoutUser();
    }, []);
    return (
        <Redirect to="/" />
    )
}

export default renderLogout;