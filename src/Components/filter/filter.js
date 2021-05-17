import React from 'react';
import './filter.scoped.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const salary = [
    {
        "id": 0,
        "name": "All",
        "array": [0,100000]
    },
    {
        "id": 1,
        "name": "0 to 500",
        "array": [0,500]
    },
    {
        "id": 2,
        "name": "500 to 1000",
        "array": [500,1000]
    },
    {
        "id": 3,
        "name": "1000 to 1500",
        "array": [1000,1500]
    },
    {
        "id": 4,
        "name": "1500+",
        "array": [1500,100000]
    }
]

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startDay: new Date(),
            salary: salary,
            location: "",
            filterSalary: []
        }
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleSalaryChange = this.handleSalaryChange.bind(this);
        // this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount(){
        // this.setState({
        //     salary: salary
        // })
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDay: date
        },() => {
            this.props.onDateChange(this.state.startDay);
        })
    };

    handleSalaryChange = (e) =>{
        this.setState({
            filterSalary: e.target.value
        },()=>{
            this.props.onSalaryChange(this.state.filterSalary);
        })
    }

    // handleLocationChange = (e) =>{
    //     this.setState({
    //         location: e.target.value
    //     })
    // }

    render(){
        return(
            <div className="filter-jobs">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-evenly">
                        {/* start day */}
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date"
                            value={this.state.startDay}
                            onChange={this.handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        {/* salary */}
                        <FormControl className="form-control" label="Salary">
                            <InputLabel id="demo-simple-select-label">Salary</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Salary"
                            label="Salary"
                            value={this.state.filterSalary}
                            onChange={this.handleSalaryChange}
                            >
                            {this.state.salary.map((item)=>{
                                // console.log(item);
                                return <MenuItem 
                                    value={item.array} 
                                    key={item.id}
                                >
                                    {item.name}
                                </MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        {/* Location */}
                        {/* <FormControl className="form-control">
                            <InputLabel id="demo-simple-select-label">Location</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            >
                                <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                                <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                                <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" className="submit-btn">
                            Search
                        </Button> */}
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default Filter;