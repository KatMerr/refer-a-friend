import React from 'react'
import Styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/style-globals'

const List = Styled.div`
    max-height: 500px;
    background-color: white;
    color: black;
    display: block;
    position: absolute;
    width: 100%;
    z-index: 1;
    border: 1px solid black;
    overflow: hidden;

    ${(props) => props.variant === "rounded" && css`
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    `}
`;

const Item = Styled.div`
    padding: 10px 5px;
    cursor: pointer;

    &:hover {
        background-color: ${Colors.darkGreen};
        color: ${Colors.mint};
    }
    &:last-of-type{
        border-bottom: none;
    }

    ${ props => props.active && css`
        background-color: ${Colors.darkGreen};
        color:  ${Colors.mint};
    `}
`;

const renderItemList = function(props){
    const { handleMouseEnter, handleMouseLeave, handleItemClick, items, noItemsText, scrollIndex, showList, variant } = props;

    return (
        (showList) ? 
            <List onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} variant={variant}>
                {
                    (items.length) 
                        ? items.map((item, i) => {
                            if (i === scrollIndex){
                                return <Item active={true} key={i} onClick={() => handleItemClick(item)}>{item.name}</Item>
                            } else {
                                return <Item key={i} onClick={() => handleItemClick(item)}>{item.name}</Item>
                            }
                        })
                        : <Item>{noItemsText}</Item>
                }
            </List>
            : null
    );
};

renderItemList.defaultProps = {
    items: [],
    noItemsText: "Can't find what you're looking for? Click here.",
    showList: true

};

renderItemList.propTypes = {
    activeIndex: PropTypes.number,
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func,
    handleItemClick: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    noItemsText: PropTypes.string,
    showList: PropTypes.bool
};

export default renderItemList;