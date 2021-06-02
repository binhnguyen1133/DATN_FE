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
  const { job, candidatesList } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [candidates, setCandidates] = useState(candidatesList);

  const handleCandidateList = () => {
    let newCandidate = [];
    for (let i = 0; i< candidates; i++){
      if(job.ma_cong_viec === candidates[i].ma_cong_viec)
        newCandidate.push(candidates[i]);
    }
    return setCandidates(newCandidate);
  }

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
                  {candidatesList.map((candidate) => (
                    <TableRow key={candidate.apply_id}>
                      <TableCell component="th" scope="row">
                        {candidate.ten_ung_vien}
                      </TableCell>
                      <TableCell>{candidate.sdt}</TableCell>
                      <TableCell align="right">{candidate.email}</TableCell>
                      <TableCell align="right" >
                        <Link to={{pathname: `${candidate.cv_url}`}}>Preview</Link>
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
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);

    useEffect(()=>{
        axios.get('https://localhost:44367/api/v1/companies/candidates', {headers: {Authorization: localStorage.getItem("token")}})
          .then(response =>{
              // console.log(response);
              setCandidates(response.data.data);
            })
          .then(()=>{
            console.log(candidates);
          })
          .catch(function (error) {
            console.log(error);
          })
    },[]);

    useEffect(()=>{
        axios.get('https://localhost:44367/api/v1/companies/jobs', {headers: {Authorization: localStorage.getItem("token")}})
          .then(response =>{
              // console.log(response);
              setJobs(response.data.data);
          })
          .then(()=>{
              // console.log(jobs);
          })
          .catch(function (error) {
            console.log(error);
          })
    },[]);

    return (
        <div className="list-apply-job">
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
              {jobs.map((job) => (
                <Row job={job} candidatesList={candidates} key={job.ma_cong_viec}/>
              ))} 
            </TableBody>
            </Table>
        </TableContainer>
      </div>
    );
}

export default ListApplyJob;