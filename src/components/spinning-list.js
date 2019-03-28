import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

//Currently breaks when its spinning and you try to clear the product
//Not spinning again when user requests a new referal.

const fastSpinTime = 200;
const medSpinTime = 300;
const slowSpinTime = 500;

const SpinContainer = styled.div`
    position: relative;
    display: inline-block;
    min-height: 30px;
    width: 100%;
    overflow: hidden;
`;

const SpinOption = styled.span`
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);

    &.spinning-fast {
        top: 100%;
        transition: all ${fastSpinTime + "ms"} linear;
    }

    &.spinning-med {
        top: 100%;
        transition: all ${medSpinTime + "ms"} linear;
    }

    &.spinning-slow {
        top: 100%;
        transition: all ${slowSpinTime + "ms"} linear;
        transform: translate(-50%, -50%);

        &.final {
            top: 50%;
        }
    }
`;

function SpinningList(props) {

    const initChildren = props.items.map((item, i) => {
        return {
            "name": item.name || item,
            "isTarget" : item.isSelected || false,
            "active": false
        }
    });
    const [children, setChildren] = useState(initChildren);

    useEffect(() => {

        let prevIndex = 0, activeIndex = 0, prevChild, activeChild, spinCount = 0, keepSpinning = true, timeout = 100, spinTimeout;
        let spinInterval = function() {
            //Shallow clone current children state
            let prevChildren = children.slice(0);
            //Get previous child and active child
            prevChild = prevChildren[prevIndex];
            activeChild = prevChildren[activeIndex];
            //Reset the prev child
            prevChild.class = "";
            //Set the spin class on the active child
            if (spinCount < 6){
                //Spin Fast
                activeChild.class = "spinning-fast";
                timeout = fastSpinTime;
            } else if (spinCount < 9){
                //Slow Down
                activeChild.class = "spinning-med";
                timeout = medSpinTime
            } else {
                //Coming to a stop
                activeChild.class = "spinning-slow";
                timeout = slowSpinTime;
                //If this is the child we're supposed to stop at, stop the loop, otherwise, keep slow turning
                if (activeChild.isTarget){
                    activeChild.class += " final";
                    keepSpinning = false;
                }
            }
            //Set the state to rerender the children
            setChildren(prevChildren);
            //Adjust indexes and increment spin count
            prevIndex = activeIndex;
            activeIndex = (prevChildren.length - 1 === activeIndex) ? 0 : activeIndex+1;
            spinCount++;
            //Set another timeout if the keep spinning flag is set.
            if (keepSpinning){
                spinTimeout = setTimeout(spinInterval, timeout);
            } 
        };
        //Start the first spin
        spinTimeout = setTimeout(spinInterval, timeout);

        return function clearTimeout() {
            //In case of component unmounting, cancel the timeout
            clearTimeout(spinTimeout);
        }
    }, []);

    return (
        <SpinContainer>
            {children.map((child, i) => <SpinOption key={i} className={child.class}>{child.name}</SpinOption>)}
        </SpinContainer>
    );
}

export default SpinningList;