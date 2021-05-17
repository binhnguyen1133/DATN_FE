import $ from 'jquery';
import React from 'react';
import Filter from '../filter/filter.js';
import { BrowserRouter, Link } from 'react-router-dom';
import { loginToken } from '../../services/api.js';
import './header.css';
import { SearchBar } from './search-bar/search-bar';

export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			role: undefined,
		};

		this.checkLogin = this.checkLogin.bind(this);
		this.checkRole = this.checkRole.bind(this);
		this.signout = this.signout.bind(this);
	}

	async componentDidMount() {
		// console.log('Header');
		const account = await this.checkRole();
		if (account !== null) {
			if (Object.keys(account).indexOf('ma_dn') > -1) {
				this.setState({
					role: 'dn',
				});
			}
			if (Object.keys(account).indexOf('ma_kh') > -1) {
				this.setState({
					role: 'kh',
				});
			}
		}

		// Menu.
		var $menu = $('#menu');
		var $topbar = $('#topbar');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {
			if ($menu._locked) return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;
		};

		$menu._show = function() {
			if ($menu._lock()) $topbar.addClass('is-menu-visible');
		};

		$menu._hide = function() {
			if ($menu._lock()) $topbar.removeClass('is-menu-visible');
		};

		$menu._toggle = function() {
			if ($menu._lock()) $topbar.toggleClass('is-menu-visible');
		};

		$menu
			.appendTo($topbar)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {
				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
				$menu._hide();

				// Redirect.
				if (href === '#menu') return;

				window.setTimeout(function() {
					window.location.href = href;
				}, 350);
			})
			.append('<a class="close" href="#menu">Close</a>');

		$topbar
			.on('click', 'a[href="#menu"]', function(event) {
				event.stopPropagation();
				event.preventDefault();

				// Toggle.
				$menu._toggle();
			})
			.on('click', function(event) {
				// Hide.
				$menu._hide();
			})
			.on('keydown', function(event) {
				// Hide on escape.
				if (event.keyCode === 27) $menu._hide();
			});
	}

	checkLogin() {
		return localStorage.getItem('token');
	}

	async checkRole() {
		const token = this.checkLogin();
		if (token) {
			const res = await loginToken(token);
			return res;
		}
		return null;
	}

	signout(e) {
		e.preventDefault();
		console.log('signout');
		localStorage.removeItem('token');
		this.setState({
			role: undefined,
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div id="topbar">
					<header id="header">
						<div className="inner">
							<Link to={`/about`} className="logo">
								<span className="fa fa-briefcase" />{' '}
								<span className="title">
									Job Agency Website
								</span>
							</Link>
							<nav>
								<ul>
									<li>
										<a href="#menu">Menu</a>
									</li>
								</ul>
							</nav>
						</div>
					</header>
					<SearchBar />
					{/* <Filter /> */}
					<nav id="menu">
						<h2>Menu</h2>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							{/* <li>
                <a href="jobs.html">Jobs</a>
              </li> */}
							{this.state.role === 'dn' ? (
								<li>
									<Link to="/create/job">Post a job</Link>
								</li>
							) : null}
							<li>
								<a href="/">About</a>
								<ul>
									<li>
										<a href="about.html">About Us</a>
									</li>
									<li>
										<a href="team.html">Team</a>
									</li>
									<li>
										<a href="blog.html">Blog</a>
									</li>
									<li>
										<a href="testimonials.html">
											Testimonials
										</a>
									</li>
									<li>
										<a href="terms.html">Terms</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="contact.html">Contact Us</a>
							</li>

							{this.checkLogin ? (
								<li
									stype={{ cursor: 'pointer' }}
									onClick={this.signout}
								>
									{' '}
									Signout
								</li>
							) : null}
							{!this.checkLogin ? (
								<li>
									<Link to="/login">Login</Link>
								</li>
							) : null}
							{!this.checkLogin ? (
								<li>
									<Link to="/register">Signup</Link>
								</li>
							) : null}
						</ul>
					</nav>
				</div>
			</BrowserRouter>
		);
	}
}

export default Header;
