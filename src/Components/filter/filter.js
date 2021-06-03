import React from 'react';
import './filter.scoped.css';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import {} from '../../services/api.js';

const salary = [
	{
		id: 0,
		name: 'All',
		value: -Infinity,
	},
	{
		id: 1,
		name: '0 to 500',
		value: 500,
	},
	{
		id: 2,
		name: '500 to 1000',
		value: 1000,
	},
	{
		id: 3,
		name: '1000 to 1500',
		value: 1500,
	},
	{
		id: 4,
		name: '1500+',
		value: Infinity,
	},
];

const time = [
	{
		id: 0,
		name: 'All',
		value: Infinity,
	},
	{
		id: 1,
		name: '1 day ago',
		value: 1,
	},
	{
		id: 2,
		name: '3 days ago',
		value: 3,
	},
	{
		id: 3,
		name: '1 week ago',
		value: 7,
	},
	{
		id: 4,
		name: '1 month ago',
		value: 30,
	},
];

let cities = [];

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
export default function Filter(props) {
	const classes = useStyles();
	cities = [
		{
			id: 0,
			name: 'All',
			value: 'All',
		},
		...props.cities,
	];
	console.log(cities);
	const [filterTime, setfilterTime] = React.useState(Infinity);
	const [filterSalary, setfilterSalary] = React.useState(-Infinity);
	const [filterCity, setfilterCity] = React.useState('All');

	React.useEffect(() => {
		props.onFilter(filterTime, filterSalary, filterCity);
	}, [filterSalary]);
	React.useEffect(() => {
		props.onFilter(filterTime, filterSalary, filterCity);
	}, [filterTime]);
	React.useEffect(() => {
		props.onFilter(filterTime, filterSalary, filterCity);
	}, [filterCity]);

	const handleFilter = (e) => {
		if (e.target.name == 'time') {
			setfilterTime(e.target.value);
		}
		if (e.target.name == 'salary') {
			setfilterSalary(e.target.value);
		}
		if (e.target.name == 'city') {
			setfilterCity(e.target.value);
		}
	};

	return (
		<div className="filter-jobs">
			<div className="container">
				<Grid container justify="flex-start">
					<FormControl className={classes.formControl}>
						<InputLabel id="filter-time-label">Day post</InputLabel>
						<Select
							labelId="filter-time-label"
							id="select-time"
							value={filterTime}
							onChange={handleFilter}
							name="time"
						>
							{time.map((item) => {
								return (
									<MenuItem
										value={item['value']}
										key={item['id']}
									>
										{item['name']}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="filter-salary-label">Salary</InputLabel>
						<Select
							labelId="salary-salary-label"
							id="select-salary"
							value={filterSalary}
							onChange={handleFilter}
							name="salary"
						>
							{salary.map((item) => {
								return (
									<MenuItem
										value={item['value']}
										key={item['id']}
									>
										{item['name']}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="filter-city-label">City</InputLabel>
						<Select
							labelId="salary-city-label"
							id="select-city"
							value={filterCity}
							onChange={handleFilter}
							name="city"
						>
							{cities.map((item) => {
								return (
									<MenuItem
										value={item['value']}
										key={item['id']}
									>
										{item['name']}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>
			</div>
		</div>
	);
}
