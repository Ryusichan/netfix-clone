import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Navi = styled.div`
    position: fixed;
    top:0;
    width: 100%;
    padding: 20px;
    height: 30px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    transition: all 0.5s;
    transition-timing-function: ease-in;
    background-color: ${props => props.variableName ? '#111' : '#1110'};
`

const NetflixLogo = styled.img`
    position: fixed;
    left: 20px;
    width: 80px;
    object-fit: contain;
`
const Avatar = styled.img`
    position: fixed;
    right: 20px;    
    width: 30px;
    object-fit: contain;
    background-color: #e1e1e1;
    border-radius: 50%;
`

function Nav() {
    
    const [show, handleShow] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    },[])
    
  
    return (
        <Navi variableName={show}>
            <NetflixLogo
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alit="Netflix Logo"
            />
            <Avatar
                src="https://upload.wikimedia.org/wikipedia/commons/e/ee/WhiteMaleAvatar.png"
                alit="Netflix Logo"
            />
        </Navi>
    )
}

export default Nav
