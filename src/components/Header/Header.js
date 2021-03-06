import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

import './header.css';

const Header = (props) => {
    return (
        <header className="header">
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo Space X"
                    className="logo"
                />
            </Link>
            <nav className="main-nav nav">
                <ul className="list">
                    {/* получили массив имен и на их количестве создали новые ссылки */}
                    {props.rockets.map((item, ind) => (
                        <li key={ind} className="item">
                            <Link to="/rocket"
                            // <Link to={`/rocket/${item.replace(' ', '_')}`}
                                onClick={e => {
                                    props.changeRockets(item);
                                }}
                                className="item-link"
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="secondary-nav">
                <ul className="list">
                    <li className="item">
                        <NavLink exact to="/"
                            className="item-link"
                            activeClassName="active"
                    >
                        Home
                    </NavLink>
                    </li>
                    <li className="item">
                        <NavLink to="/calendar"
                            className="item-link"
                            // activeClassName = добавляет класс ссылке, когда активна страница по этой ссылке
                            activeClassName="active"
                        >
                            Calendar
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
