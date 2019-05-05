import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DashboardMenu from '../molecules/dashboard-menu'
import DashboardDisplay from '../molecules/dashboard-display'
import { Breakpoints } from '../../utils/style-globals'

const Dashboard = styled.div`
    max-width: ${ Breakpoints.max};
    display: grid;
    grid-template-columns: minmax(200px, 1fr) 3fr;
`;

function renderDashboard(props){
    const { items } = props;

    const [selectedItem, setSelectedItem] = useState();

    return (
        <Dashboard>
            <DashboardMenu items={items} onItemClick={setSelectedItem} selectedItem={selectedItem} />
            <DashboardDisplay item={selectedItem} />
        </Dashboard>
    )
}

renderDashboard.propTypes = {
    items: PropTypes.array.isRequired
}

export default renderDashboard;