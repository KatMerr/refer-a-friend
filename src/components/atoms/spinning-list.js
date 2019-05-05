import React, { useEffect, useState } from 'react'
import { useInterval } from '../../utils/helpers'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

//This needs more work
//Not spinning again when user requests a new referal.

const SpinContainer = styled.div`
    position: relative;
    display: inline-block;
    min-height: 30px;
    min-width: 150px;
    overflow: hidden;
    vertical-align: bottom;
`;
const Start = keyframes`
    from { top: 0;}
    to { top: 75px; }
`;

const Spin = keyframes`
    from { top: -75px; }
    to { top: 75px; }
`;
const Stop = keyframes`
    from { top: -50px;}
    to { top: 0;}
`;
const SpinningChild = styled.div`
    display: inline-block;
    position: relative;
    animation: ${props => (props.isTarget) ? ((!props.isSpinning) ? Start : Stop) : Spin} ${props => props.duration}ms linear infinite;
    animation-iteration-count: ${props => (props.isTarget) ? 1 : "infinite"};
`;

const SpinningList = function(props) {
    const { delay, items } = props;

    function initChildren(){
        return items.map((item, i) => {
            return {
                "name": item.name || item,
                "isTarget" : (i === items.length - 1) ? true : false
            }});
    }
    //Set the items to iterate to. Name is simply the value of the item. isTarget is true for the item that should display when done spinning. Active is for the item currently spinning
    const [children, setChildren] = useState();
    const [activeChild, setActiveChild] = useState();
    const [activeChildIndex, setActiveChildIndex] = useState(0);
    const [rotationDelay, setrotationDelay] = useState(delay);
    const [isSpinning, setIsSpinning] = useState(true);

    useEffect(() => {
        setChildren(initChildren());
        setrotationDelay(delay);
    }, [items])

    useInterval(() => {
        if (children){
            if (activeChildIndex === children.length - 1){
                setrotationDelay(null);
                setIsSpinning(false);
                setActiveChildIndex(0);
            } else {
                setIsSpinning(true);
                let activeIndex = (activeChildIndex === children.length - 1) ? 0 : activeChildIndex + 1;
                setActiveChildIndex(activeIndex);
                let child = children[activeIndex];
                setActiveChild(child);
                if (activeChildIndex > children.length - 6) setrotationDelay(delay*2);
            }
        }
    }, rotationDelay);

    return (
        <SpinContainer>
            {(activeChild) ? <SpinningChild isSpinning={isSpinning} isTarget={activeChild.isTarget} duration={rotationDelay}>{activeChild.name}</SpinningChild> : null }
        </SpinContainer>
    );
}

SpinningList.defaultProps = {
    delay: 250
}

SpinningList.propTypes = {
    delay: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired
}

export default SpinningList;