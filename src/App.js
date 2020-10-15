import React, {Component} from 'react';
import './style.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';

import FetchData from './service/FetchData';
// import Calendar from './components/Calendar/Calendar';
// import Details from './components/Details/Details';

export default class App extends Component {
  fetchData = new FetchData(); // объект с методами

  state = {
    rocket: 'Falcon 1',
    rocketFeturs: null,
    rockets: [],
  }

  componentDidMount() {
    this.updateRocket();
  }


  updateRocket() {
    this.fetchData.getRocket()
    .then(data => {
      this.setState({rockets: data.map(item => item.name)});
      return data
    })
    .then(data => data.find(item => item.name === this.state.rocket))
    .then(rocketFeatures => this.setState({
      rocketFeatures  //для использов данных - вызывать второй парамет () => {}
    }));
  }

  changeRockets = (rocket) => {  //стрелочная позволяет избавиться от this
    this.setState({
      rocket
    }, this.updateRocket);
  }

  render() {
    console.log(this.state.rocketFeturs);
    return (
      <>
        <Header rockets={this.state.rockets} changeRockets={this.changeRockets}/>
        <Main rocket={this.state.rocket}/>
        <Features rocketFeturs={this.state.rocketFeturs}/>
        {/* <Calendar /> */}
        {/* <Details /> */}
        <Footer />
      </>
    )
  }
}

// export default App;
