import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './list-apply-job.scoped.css';
import {Link} from 'react-router-dom'
import CV from './get-cv';
import { indexOf, set } from 'lodash';

ListApplyJob.propTypes = {
    
};

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { job, candidates } = props;
  const [cv, setCv] = useState();
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  console.log(job);
  console.log(candidates);

  // console.log(candidates);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {job.ten_cong_viec}
        </TableCell>
        <TableCell align="right">{job.ngay_bat_dau}</TableCell>
        <TableCell align="right">{job.ngay_ket_thuc}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Candidates List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">CV</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.apply_id}>
                      <TableCell component="th" scope="row">
                        {candidate.ten_ung_vien}
                      </TableCell>
                      <TableCell>{candidate.sdt}</TableCell>
                      <TableCell align="right">{candidate.email}</TableCell>
                      <TableCell align="right" >
                        <CV apply_id={candidate.apply_id}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function ListApplyJob(props) {
    console.log("render");
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [jobCandidates, setJobCandidates] = useState([]);

    // lấy danh sách job của doanh nghiệp
    useEffect(()=>{
      axios.get(process.env.REACT_APP_API_COMPANY_JOBS, {headers: {Authorization: localStorage.getItem("token")}})
      .then(response =>{
        // console.log(response.data.data);
        setJobs(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    },[]);
    
    // lấy danh sách ứng viên của một job
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_JOB_CANDIDATES, {headers: {Authorization: localStorage.getItem("token")}})
          .then(response =>{
              console.log(response.data.data);
              setCandidates(response.data.data);
            })
          .catch(function (error) {
            console.log(error);
          })
    },[]);

  // kiểm tra job nào có ai apply
  const checkJob = () => {
    const arrJobs = [];
    let arrCandidates = [];
    jobs.forEach(job =>{
      candidates.forEach(candidate =>{
        if(candidate.ma_cong_viec === job.ma_cong_viec && arrJobs.indexOf(job) === -1){
          arrCandidates.push(candidate);
          // setCandidates(arrCandidates);
          arrJobs.push(job);
          // setJobs(arrJobs);
        }
      })
    })
    return arrJobs;
  }

  const checkCandidates = () => {
    const arrJobs = [];
    let arrCandidates = [];
    jobs.forEach(job =>{
      candidates.forEach(candidate =>{
        if(candidate.ma_cong_viec === job.ma_cong_viec){
          arrCandidates.push(candidate);
          // setCandidates(arrCandidates);
          arrJobs.push(job);
          // setJobs(arrJobs);
        }
      })
    })
    return arrCandidates;
  }

  // console.log(checkJobCandidates());

    return (
        <div className="list-apply-job">
        <h1>LIST APPLY JOBS</h1>
        <TableContainer component={Paper} className="table">
          <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Jobs name</TableCell>
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="right">End Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {checkJob().map((job) => (
                <Row job={job} key={job.ma_cong_viec} candidates={checkCandidates()}/>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}

export default ListApplyJob;