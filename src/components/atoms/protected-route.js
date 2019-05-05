import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isUserAdmin } from '../../utils/authentication'

const ProtectedRoute = function(props){
    const { Component = props.component, fallback } = props;
    return (
          (isUserAdmin())
          ?  <Component {...props} /> 
          :  <Redirect to={{ pathname: fallback}} /> 
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.node.isRequired,
    fallback: PropTypes.string.isRequired
}

export default ProtectedRoute;