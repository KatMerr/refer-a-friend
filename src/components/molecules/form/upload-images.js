import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import FieldWrapper from '../../atoms/field-wrapper'
import Label from '../../atoms/label'
import Image from '../../atoms/image'
import ToolTip from '../../atoms/tooltip'
import FileUpload from '../../atoms/file-upload'
import Error from '../../atoms/error'

const StyledLabel = styled(Label)`
    display: block;
`;

const StyledImage = styled(Image)`
    max-width: 400px;
    max-height: 1000px;
    display: block;
    margin: 10px auto 0;
`;

const renderFileUpload = function(props){

    //Still need to check for proper image size being below a certain size, as well as height and width restrictions
    const [ images, setImages ] = useState([]);
    const [ errors, setErrors ] = useState([]);
    const { accept, disabled, id, label, maxSize, multiple, name, onChange, onFocus, required, toolTip, usePreview } = props;

    const onChangeIntercept = function(files){
        //Seperate out the acceptable extension into regex acceptable string format [(.png|.gif|.pdf)]
        const extensions = accept.toString().replace(/,/g, "|");
        //Creating the regex
        const imageRegex = new RegExp(`.+(${extensions})$`);
        //Max Size is in Megabytes, convert to bytes
        const maxBytes = 1024 * 1024 * maxSize;
        //Loop through the files and check against the requirements, push into the accepted array if it passes, otherwise trigger the error
        let passedImages = []; let currentImage, errorArray = [], imageOK = true, extensionTest = false, sizeTest = false;
        for (let i = 0; i < files.length; i++){
            currentImage = files[i];
            //First test, against the accepted file type regex
            if(!imageRegex.test(currentImage.name)){
                //test unsuccessful
                imageOK = false;
                extensionTest = true;
            } 
            //Second Test, if there is a max size, check to make sure its under it.
            if (maxSize){
                if (maxBytes < currentImage.size){
                    imageOK = false;
                    sizeTest = true;
                }
            }
            //If there's no errors.
            if (imageOK){
                passedImages.push(currentImage);
            }
        }
        //If we're showing the preview images, set them to the images that passed
        if (usePreview){
            setImages(passedImages);
        }
        //Run through the possible errors and generate the error array
        if (extensionTest) errorArray.push("Some Files have an Invalid File Format");
        if (sizeTest) errorArray.push("Some files are too large.");
        setErrors(errorArray);
        //Run the passed down onChange function, passing in the filered Files
        onChange(passedImages);
    }
    return(
        <FieldWrapper>
            <StyledLabel for={id} required={required}>
                { label }
                { (maxSize) ? <> (Max Size is {maxSize})</> : null}
                { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
            </StyledLabel>
            <FileUpload
                accept={accept}
                disabled={disabled}
                id={id}
                multiple={multiple}
                name={name}
                onChange={onChangeIntercept}
                onFocus={onFocus} />
                {
                    (usePreview && images.length) ?
                        <>
                            {
                                images.map((image, i) => <StyledImage key={i} src={URL.createObjectURL(image)} />)
                            }
                        </> : null
                }
                {
                    (errors.length) ? errors.map((err, i) => <Error key={i}>{err}</Error>) : null
                }
        </FieldWrapper>
    );
};

renderFileUpload.defaultProps = {
    accept: [".png", ".jpg"],
    usePreview: false,
    multiple: false,
    required: false
};

renderFileUpload.propTypes = {
    accept: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    maxSize: PropTypes.number,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
    toolTip: PropTypes.string,
    usePreview: PropTypes.bool,
};

export default renderFileUpload;