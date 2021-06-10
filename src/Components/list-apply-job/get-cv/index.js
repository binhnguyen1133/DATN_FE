import {React, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

CV.propTypes = {
    apply_id: PropTypes.number,
};

function CV(props) {
    const {apply_id} = props;
    const [cv, setCv] = useState();
    console.log(apply_id);

    // lấy cv của ứng viên apply vào job
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_CANDIDATE_CV}${apply_id}`, {headers: {Authorization: localStorage.getItem("token")}})
        .then(response =>{
            // console.log(response.data);
            setCv(response.data);
        })
        .then(()=>{console.log(cv)})
        .catch((error)=>{
            console.log(error);
        })
    },[])

    function handleClick(){
        console.log(cv);
    }

    return (
        <div>
            <button onClick={handleClick}>Preview</button>
        </div>
    );
}

export default CV;