import React, { useContext, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "./header.scss";

import logo from "../../assets/main-logo.svg"
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthAction';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie/all'
    },
    {
        display: 'Series',
        path: '/series/all'
    }
];

const Header = () => {
    const {dispatch} = useContext(AuthContext);

    const {pathname} = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() =>{
        try {
            const shrinkHeader = () =>{
                if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                    headerRef.current?.classList?.add('shrink');
                }
                else{
                    headerRef.current?.classList?.remove('shrink');
                }
            }
            window.addEventListener('scroll', shrinkHeader);
            return () =>{
                window.removeEventListener('scroll', shrinkHeader)
            }
        } catch (error) {
        }
    }, [])

  return (
    <div ref={headerRef} className='header'>
        <div className="header__wrap container">
            <div className="logo">
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>

            <ul className="header__nav">
                {
                    headerNav.map((e, i) => (
                        <li key={i} className={`${i === active ? 'active' : ''}`}>
                            <Link to={e.path}>
                                {e.display}
                            </Link>
                        </li>
                    ))
                }
                <div className="profileCircle">
                    {/* <img src="https://i.pinimg.com/564x/64/e1/eb/64e1eb2d17dd18e2bf04fab75f913c85.jpg" alt="" /> */}
                    {/* <img src="\Images\mini Logo.svg" alt="" /> */}
                    <p>{user && ((user["username"])[0].toUpperCase())}</p>
                    
                    <div className="options">
                        <Link to="/account"><span>My List</span></Link>
                        <span onClick={() => dispatch(logout())}>Logout</span>
                    </div>
                </div>
            </ul>
        </div>
    </div>
  )
}

export default Header