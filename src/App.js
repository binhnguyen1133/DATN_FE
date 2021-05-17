// import logo from './logo.svg';
// import './App.css';
import { routes } from './Routes/routes.js';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Header, Footer, Login, SignUpComponent } from './Barrel/index.js';
import React from 'react';

import Emitter from './services/event.js';

export class App extends React.Component {
	constructor(props) {
		super(props);
		// console.log("APP");
		this.SEARCH_EVENT_NAME = 'SEARCH_EVENT';
		this.state = {
			currentPath: window.location.pathname,
			isRouteChange: 0,
		};
	}

	componentDidMount() {
		Emitter.on(this.SEARCH_EVENT_NAME, (newValue) => {
			// console.log('ON ' + this.SEARCH_EVENT_NAME + ' ' + newValue);
			this.props.history.push(
				`/result-search/${encodeURIComponent(newValue)}`
			);
			this.setState((state) => {
				return {
					isRouteChange: state.isRouteChange + 1,
				};
			});
		});
	}

	render() {
		if (this.state.currentPath !== '/login') {
			return (
				<div>
					<Header />
					<Switch>
						{routes.map(({ path, component }, key) => (
							<Route
								exact
								path={path}
								component={component}
								key={key + this.state.isRouteChange}
							/>
						))}
					</Switch>
					<Footer />
				</div>
			);
		} else if (this.state.currentPath === '/register') {
			return <SignUpComponent />;
		} else {
			return <Login />;
		}
	}
}

export default withRouter(App);
