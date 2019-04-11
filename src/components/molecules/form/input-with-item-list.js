import React, { useState } from 'react'
import Input from '../../atoms/input'
import ItemList from '../../atoms/item-list'
import Label from '../../atoms/label'
import FieldWrapper from '../../atoms/field-wrapper'
import ToolTip from '../../atoms/tooltip'
import PropTypes from 'prop-types'

const renderInputWithDataList = function(props){

    const { handleItemClick, id, includeLabel, inputValue, labelValue, listItems, name, placeholder, onChange, required, toolTip } = props;

    const [fileteredItems, setFilteredItems] = useState(listItems.slice(0, 10));
    const [isListHoveredOver, setIsListHoveredOver] = useState(false);
    const [scrollIndex, setScrollIndex] = useState();
    const [showDataList, setShowDataList] = useState(false);

    function onItemClick(item){
        //On Selecting an Item, first run the controlled component function passed in through props
        handleItemClick(item);
        //hide the Item List
        setShowDataList(false);
        //Reset the Scroll Index
        setScrollIndex();
    }

    function onInputChange(input){
        //On input change, first run the controlled component function passed in through props
        onChange(input);
        //Filtered Item List should show only if there are 3 or more characters in the query
        if (input.length > 2){
            const lowerCaseInput = input.toLowerCase();
            setFilteredItems(listItems.filter(item => item.name.toLowerCase().includes(lowerCaseInput)).slice(0, 10));
            setShowDataList(true);
        } else {
            setShowDataList(false);
        }
    }

    //Item List should appear on input's focus only if there are 3 or more characters in the query
    function handleOnFocus(){
        if(inputValue !== undefined && inputValue.length > 2){
            setShowDataList(true);
        } else {
            setShowDataList(false);
        }
    }

    //Simple function to increment the scroll index
    function incrementScrollIndex(){
        if (scrollIndex === undefined) setScrollIndex(0);  
        else if (scrollIndex === fileteredItems.length - 1) {}
        else setScrollIndex(scrollIndex + 1);
    }

    //Simple function to decrement the scroll index
    function decrementScrollIndex(){
        if (scrollIndex && scrollIndex !== 0) setScrollIndex(scrollIndex - 1);
        else setScrollIndex(0);
    }

    //Allows for keyboard control of the input and datalist fields, but only if the datalist is showing
    function handleBeforeInput(e) {
        if (showDataList){
            switch (e.key.toLowerCase()){
                case "arrowdown":
                    incrementScrollIndex()
                    break;
                case "arrowup":
                    decrementScrollIndex();
                    break;
                case "enter":
                    e.preventDefault();
                    onItemClick(fileteredItems[scrollIndex]);
                    break;
                default:
                    setScrollIndex();
            }
        }
    }

    return (
        <FieldWrapper>
            { (includeLabel) ? 
                <Label for={id} required={required}>
                    { labelValue }
                    { (toolTip) ? <ToolTip>{ toolTip }</ToolTip> : null }
                </Label> 
                : null 
            }
            <Input
                id={id}
                name={name}
                onChange={(e) => onInputChange(e.target.value)}
                onFocus={handleOnFocus}
                onBlur={() => setShowDataList(isListHoveredOver)}
                onKeyDown={handleBeforeInput}
                placeholder={placeholder}
                value={inputValue}
                variant={(showDataList) ? "rounded" : null}
                type="text" />
            <ItemList
                items={fileteredItems}
                handleMouseEnter={() => setIsListHoveredOver(true)}
                handleMouseLeave={() => setIsListHoveredOver(false)}
                handleItemClick={(itemClicked) => onItemClick(itemClicked)}
                scrollIndex={scrollIndex}
                showList={showDataList}
                variant="rounded" />
        </FieldWrapper>
    )
};

renderInputWithDataList.defaultProps = {
    includeLabel: false,
    required: false
}

renderInputWithDataList.propTypes = {
    onChange: PropTypes.func.isRequired,
    handleItemClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    includeLabel: PropTypes.bool,
    inputValue: PropTypes.string.isRequired,
    labelValue: PropTypes.string,
    listItems: PropTypes.array.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    toolTip: PropTypes.string
}

export default renderInputWithDataList

