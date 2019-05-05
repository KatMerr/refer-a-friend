import React from 'react'
import styled from 'styled-components'
import { Colors, Fonts} from '../../utils/style-globals'

const Error = styled.div`
    color: ${Colors.red};
    font-weight: ${Fonts.weights.bold};
`;

const renderError = function(props){
    const { className, children } = props;
    return(
        <Error className={className}>{children}</Error>
    );
};

export default renderError;