import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './apply-job.scoped.css';
import axios from 'axios';

ApplyJob.propTypes = {
    ma_doanh_nghiep: PropTypes.number,
    ma_cong_viec: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  

export function ApplyJob(props) {
    // console.log(props.location.query.ma_doanh_nghiep, props.location.query.ma_cong_viec);
    const classes = useStyles();

    // console.log(props);

    const [madn, setMadn] = useState(()=>{
        return props.location.query.ma_doanh_nghiep;
    });

    const [macv, setMacv] = useState(()=>{
        return props.location.query.ma_cong_viec;
    });

    const [name, setName] = useState('');

    const [phone, setPhone] = useState('');

    const [email, setEmail] = useState('');

    const [cv, setCv] = useState(null);

    function handleChangeName(e){
        let info = e.target.value;
        return setName(info);
    }
    
    function handleChangePhone(e){
        let info = e.target.value;
        return setPhone(info);
    }

    function handleChangeEmail(e){
        let info = e.target.value;
        return setEmail(info);
    }

    function handleFileChange(e) {
        let loadCv = e.target.files[0];
        return setCv(loadCv);
    }

    function handleSubmit(){
        const formData = new FormData();
        formData.append('ten_khach_hang', name);
        formData.append('sdt', phone);
        formData.append('email', email);
        formData.append('ma_doanh_nghiep', madn);
        formData.append('ma_cong_viec', macv);
        formData.append('cv', cv, cv.name);
        // console.log(process.env.REACT_APP_API_APPLY_JOB);
        axios.post(`${process.env.REACT_APP_API_APPLY_JOB}`, formData)
            .then((response) => {
                if(response.status === 200){
                    alert("Success");
                }
            })
    }

    return (
        <div className="apply-job">
            <h1 className="heading">APPLY FOR THIS JOB</h1>
            <form className={classes.root} className="form-top" noValidate autoComplete="off">
                <TextField className="form" id="outlined-basic-1" label="Full name" variant="outlined" onChange={handleChangeName} required/>
                <TextField className="form" id="outlined-basic-2" label="Phone" variant="outlined" onChange={handleChangePhone} required/>
                <TextField className="form" id="outlined-basic-3" label="Email" type="email" variant="outlined" onChange={handleChangeEmail} required/>
                <input
                    id="contained-button-file"
                    type="file"
                    required
                    onChange={handleFileChange}
                />
                <Button className="submit-btn" variant="contained" color="primary" onClick={handleSubmit}>
                    Submit Form
                </Button>
            </form>
        </div>
    );
}

export default ApplyJob;