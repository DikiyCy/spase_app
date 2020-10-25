import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details';

import FetchData from './service/FetchData';

import './style.css';
export default class App extends Component {
	fetchData = new FetchData(); // объект с методами

	state = {
		rocket: 'Falcon 1',
		rocketFeatures: null,
		rockets: [],
		company: null,
	}

	// метод жизненного цикла, который вызывается до рендера
	componentDidMount() {
		this.updateRocket();
		this.updateCompany();
	}


	updateRocket() {
		this.fetchData.getRocket()
		.then(data => {
			this.setState({rockets: data.map(item => item.name)});
			return data
		})
		.then(data => data.find(item => item.name === this.state.rocket))
		.then(rocketFeatures => this.setState({
			rocketFeatures  //хотим что-то сразу сделать с данными - вызываем после {} колбэк
		}))
		// .then(() => console.log(this.state.rocketFeatures));
	}

	changeRockets = (rocket) => {  //стрелочная позволяет избавиться от this
		this.setState({
			rocket,
		}, this.updateRocket);
	}

	updateCompany = () => {
		this.fetchData.getCompany()
			.then(company => {
				return this.setState({
					company
				})
			})

	}

	render() {
		// console.log(this.state);
		return (
			<BrowserRouter>
				<Header rockets={this.state.rockets} changeRockets={this.changeRockets}/>
				{/* страница, котор отображ п/у, т.к. path='/'*/}
				{/* для передачи пропсов в компонент роутера - render */}
				<Route path='/'
					exact render={() => {
					return this.state.company && <Home company={this.state.company}/>
				}}/>
					{/* можно сделать страницу 404 */}
				<Route
					path='/rocket'
					render={() => {
						/* при первом рендере отправился null => сделать проверку на наличие данных */
						return this.state.rocketFeatures && <Features {...this.state.rocketFeatures}/>
					}}
				/>
				<Route path='/calendar' component={Calendar} />
				{/* создали пропс, относ к роуту, когда сом={det}":id" - Позволяет передать в пропс объект из которого можно через match вытащить id */}
				<Route path='/details/:id' component={Details} />
				{/* раскрыли рестом объект для передачи 4-х свойств
					обращение к неуществ. свойству, напрю., this.state?.company*/}
				{this.state.company && <Footer {...this.state.company}/>}

			</BrowserRouter>
		)
	}
}
