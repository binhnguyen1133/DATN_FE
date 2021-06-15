// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Footer, Header, Login, SignUpComponent } from './Barrel/index.js';
import { routes } from './Routes/routes.js';
import Emitter from './services/event.js';


export class App extends React.Component {
	constructor(props) {
		super(props);
		// console.log("APP");
		this.SEARCH_EVENT_NAME = 'SEARCH_EVENT';
		this.state = {
			currentPath: window.location.pathname,
			isRouteChange: 0,
			account: {},
		};
		this.getAccount = this.getAccount.bind(this);
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

	getAccount = (account) => {
		if(account !== undefined)
			this.setState({
				account: {...account}
			})
	}

	render() {
		if (this.state.currentPath !== '/login') {
			return (
				<div>
					<Header account={this.getAccount}/>
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
