import {React, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { get } from 'lodash';

CV.propTypes = {
    apply_id: PropTypes.number,
};

function CV(props) {
    const {apply_id} = props;
    const [cv, setCv] = useState();
    console.log(apply_id);

    // lấy cv của ứng viên apply vào job
    // useEffect(()=>{
    //     axios.get(`${process.env.REACT_APP_API_CANDIDATE_CV}${apply_id}`, {headers: {Authorization: localStorage.getItem("token")}})
    //     .then(response =>{
    //         // console.log(response.data);
    //         setCv(response.data);
    //     })
    //     .then(()=>{console.log(cv)})
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // },[])

    function handleClick(){
        // const link = document.createElement("a");
        // link.target = "_blank";
        // link.download = "cv"
        // axios
        //   .get(`${process.env.REACT_APP_API_CANDIDATE_CV}${apply_id}`, {headers: {Authorization: localStorage.getItem("token")}}, {
        //     responseType: "blob",
        //   })
        //   .then((res) => {
        //     console.log(res.data);
        //     link.href = URL.createObjectURL(
        //       new Blob([res.data], { type: "application/pdf" })
        //     );
        //     link.click();
        //   });
        axios({
			url:
                `${process.env.REACT_APP_API_CANDIDATE_CV}${apply_id}`,
            headers: {Authorization: localStorage.getItem("token")},
			method: "GET",
			responseType: "blob"
		}).then(response => {
			console.log(response);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "cv.pdf");
			document.body.appendChild(link);
			link.click();
		});
    }

    return (
        <div>
            <button onClick={handleClick}>Download</button>
        </div>
    );
}

export default CV;