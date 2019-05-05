import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MenuItem from '../atoms/menu-item'

const Menu = styled.div`
    grid-column-start: 1;
    height: 100%;
    overflow: hidden;
`;

function renderMenu(props){
    const { className, items, onItemClick, selectedItem} = props;

    return (
        <Menu className={className}>
            {(items.length) ? 
                items.map((item, i) => <MenuItem active={!!(item === selectedItem)} key={i} onClick={() => onItemClick(item)}>{item.name} - {item.company}</MenuItem>)
                : <MenuItem>No Items Found</MenuItem>
            }
        </Menu>
    )
}

renderMenu.propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
}

export default renderMenu;