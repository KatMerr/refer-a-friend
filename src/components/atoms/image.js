import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Image = styled.img`
    
`;

const renderImage = function(props){
    const { alt, height, src, width } = props;
    return(
        <Image src={src} alt={alt} height={height} width={width} />
    );
};

renderImage.defaultProps = {
    height: "100%",
    width: "100%"
};

renderImage.propTypes = {
    alt: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    src: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default renderImage;