import {useEffect, useState} from 'react';
import FetchData from '../../service/FetchData';

const fetchData = new FetchData();

// вызывает и всегда используем один и тот же метод обращения к серверу
const useLaunches = () => {
    // хуки позволяют использовать состояние у функциональных компонентов
    // data - данные в стейте, setData - функция по обновлению стейта (вытащили: useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData.getLaunches()
            .then(launches => setData(state => [...launches]))
    }, []);
    // ведет поиск по id среди данных о запусках
    const getLaunch = id => data.find(item => item.id === id);

    return { data, getLaunch }
};

export default useLaunches;
