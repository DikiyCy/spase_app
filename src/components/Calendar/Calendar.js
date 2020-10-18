import React, { useEffect, useState } from 'react';
import FetchData from '../../service/FetchData';
import Main from '../Main/Main';
import { Link } from 'react-router-dom';

import './calendar.css';

const fetchData = new FetchData();

const Calendar = () => {

    // хуки позволяют использовать состояние у функциональных компонентов
    // data - данные в стейте, setData - функция по обновлению стейта (вытащили:
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData.getLaunches()
            .then(launches => setData(state => [...launches]))
    }, [])

    console.log(data);

    return (
        <>
            <Main />
            <section className="calendar">
                <div className="container">
                    <ul className="calendar-list">
                        { data.map(item => {
                            return (
                                <li className="calendar-item" key={item.id}>
                                    <article className="launches">
                                        <div className="launches-image">
                                            <img src={item.links.patch.small} alt="" />
                                        </div>
                                        <div className="launches-content">
                                            <h2 className="launches-title">{item.name}</h2>
                                            <Link to="/details" className="button launches-details">Подробнее</Link>
                                        </div>
                                    </article>
                                </li>
                            )})}

                    </ul>
                </div>
            </section>
        </>

    )
}

export default Calendar;
