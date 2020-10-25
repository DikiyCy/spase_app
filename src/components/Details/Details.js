import React, {useState, useEffect} from 'react';
// хук для работы с историей посещения - возвращает объект
import { useHistory } from 'react-router-dom';
import useLaunches from '../useLaunches/useLaunches';
import Youtube from 'react-youtube';
import Main from '../Main/Main';

import './details.css';
// дз - отобразить информацию о том запуске, на кот. переходим
const Details = (props) => {
    // данный стэйт можно переаписывать
    const [launch, setLaunch] = useState(null);

    const { getLaunch } = useLaunches();

    useEffect(() => {
        // получили id из пропсов переданных из Арр - вызвали с сервака, отфильтровали, вернули, перезапишем
        setLaunch(getLaunch(props.match.params.id));
    })

    const history = useHistory(); //есть метод goBack - возврат на предыд.страницу

    // если компонент ещё не получил свойства, то можно показать сначала лоадер, {launch?.details} не требуется
    if(!launch) return <div>Сюда поставил прелоадер для показа загрузки</div>


    return (
        <>
            <Main name={launch.name}/>
            <main className="details">
                <div className="container">
                    <div className="details-row">
                        <div className="details-image">
                            <img src={launch.links.patch.small} alt={launch.name} />
                        </div>
                        <div className="details-content">
                            <p className="details-description">{launch.details}</p>
                        </div>
                    </div>
                    <Youtube className="details-youtube" videoId={launch.links.youtube_id}/>
                </div>
                <a onClick={history.goBack} className="button button-back">go back</a>
            </main>
        </>
    )
}

export default Details;
