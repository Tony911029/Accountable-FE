import React, {useState} from "react"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from "react-router-dom";
import {SidebarData} from "./SideBarData";
import './NavBar.css'

function NavBar({children}){
    const [sidebar, setSideBar] = useState(false)
    const [title, setTitle] = useState("Home")

    const showSideBar = ()=> setSideBar(!sidebar)
    const updateTitle = (title)=> {
        setTitle(title)
    }
    return (
        <>
            <div className={"navbar"}>
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSideBar}/>
                </Link>
                <h2>{title}</h2>
            </div>
            <div>
                <nav className={sidebar ? 'nav-menu active' : "nav-menu"}>
                    <ul className='nav-menu-items' onClick={showSideBar}>
                        <li className={'navbar-toggle'}>
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        {SidebarData.map((item, index) =>{
                            return (
                                <li key={index}
                                    className={item.cName}
                                    onClick={()=>updateTitle(item.title)}>
                                    <Link to={item.path} >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
            {/*main content is here*/}
            <main className={sidebar ? "content_no_side_bar": "content"}>
                {children}
            </main>
        </>
    )
}

export default NavBar