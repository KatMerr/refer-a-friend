import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

const FileUpload = styled.input`
    display: block;
    color: ${Colors.darkGray};
`;

const renderFileUpload = function(props){

    const { accept, className, disabled, id, multiple, name, onChange, onFocus} = props;
    
    return(
        <FileUpload
            accept={accept}
            className={className}
            disabled={disabled}
            id={id}
            multiple={multiple}
            name={name}
            onChange={(e) => onChange(e.target.files)}
            onFocus={onFocus}
            type="file"></FileUpload>
    );
};

renderFileUpload.defaultProps = {
    multiple: false
};

renderFileUpload.propTypes = {
    accept: PropTypes.array,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string

};

export default renderFileUpload;