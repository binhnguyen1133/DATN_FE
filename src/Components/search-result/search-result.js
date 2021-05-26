import React from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../../Barrel/index.js";
import Filter from "../filter/filter.js";
import "./search-result.scoped.css";

export class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      value: "",
      pageIndex: 0,
      skipRelatedRecords: 0,
      skipNormalizeRecords: 0,
      totalRecord: 0,
      jobsByFilter: []   
    };
    this.getJobs = this.getJobs.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  async componentDidMount() {
    console.log("componentDidMount");
    const id = decodeURIComponent(this.props.match.params.id);
    // console.log(this.props.match);
    await this.getJobs(id, this.state.pageIndex, this.state.skipRelatedRecords, this.state.skipNormalizeRecords);
    this.setState({
      jobsByFilter: [... this.state.jobs]
    });
  }

  handlePageChange(newPage, skipRelatedRecords, skipNormalizeRecords) {
    console.log("handleChangePage");
    this.getJobs(this.props.match.params.id, newPage, skipRelatedRecords, skipNormalizeRecords);
  }

  handleDateChange(date){
      // let arrTemp = [];
      // this.state.jobs.map((jobType) =>{
      //   let key = jobType[0]
      //   let temp_arr = [key,[]]
      //   jobType[1].map(job =>{
      //     const convertDate = new Date(job.ngay_bat_dau);
      //     if(convertDate.getTime() > date){
      //       temp_arr[1].push(job)
      //     }
      //   })
      //   arrTemp.push(temp_arr);
      // })
      // this.setState({
      //   jobsByFilter: arrTemp
      // })  
  }

  handleSalaryChange(salary){
    // let arrTemp = [];
    // this.state.jobs.map((jobType) =>{
    //   let key = jobType[0]
    //   let temp_arr = [key,[]]
    //   jobType[1].map(job =>{
    //     if(job.luong_toi_da >= salary[0] && job.luong_toi_da < salary[1]){
    //       temp_arr[1].push(job)
    //     }
    //   })
    //   arrTemp.push(temp_arr);
    // })
    // this.setState({
    //   jobsByFilter: arrTemp
    // })
  }

  handleFilterChange(filter, category){
    let arrTemp = [];
    this.state.jobs.map((jobType) =>{
      let key = jobType[0]
      let temp_arr = [key,[]]
      
      // temp_arr.push(jobType[1].filter((item) =>{
      //   const convertDate = new Date(item.ngay_bat_dau);
      //   return convertDate.getTime() > filter || (item.luong_toi_da >= filter[0] && item.luong_toi_da < filter[1]);
      // }));

      jobType[1].map(job =>{
        const convertDate = new Date(job.ngay_bat_dau);
        if(category==="date" && convertDate.getTime() > filter){
            temp_arr[1].push(job);
        }
        if(category==="salary" && (job.luong_toi_da >= filter[0] && job.luong_toi_da < filter[1])){
            temp_arr[1].push(job);
        }
        if(category=== "date" || category==="salary"){
          temp_arr[1].push(job);
        }
      })
      arrTemp.push(temp_arr);
    })
    this.setState({
      jobsByFilter: arrTemp
    })
  }

  changeDate(date) {
    var newDate = new Date(date);
    return newDate.toDateString();
  }

  async getJobs(searchKey, newPage, skipRelatedRecords, skipNormalizeRecords) {
    console.log("getJobs");
    const res = await fetch(
      `${process.env.REACT_APP_API_SEARCH}?searchKey=${encodeURIComponent(
        searchKey
      )}&pageIndex=${newPage}&skipRelatedRecords=${skipRelatedRecords}&skipNormalizeRecords=${skipNormalizeRecords}`
    );
    const data = await res.json();
    // console.log(Object.entries(data.data.data));
    this.setState(function() {
      return {
        jobs: Object.entries(data.data.data),
        pageIndex: data.data.pageIndex,
        skipRelatedRecords: data.data.skipRelatedRecords,
        skipNormalizeRecords: data.data.skipNormalizeRecords,
        totalRecord: data.data.totalRecord,
      };
    });  
  }

  render() {
    // this.handleFilterChange();
    console.log("renderd");
    return (
      <div>
      {/* <Filter 
        onDateChange={(filter)=>this.handleFilterChange(filter,"date")} 
        onSalaryChange={(filter)=>this.handleFilterChange(filter,"salary")} 
      /> */}
      <Filter onDateChange={this.handleDateChange} onSalaryChange={this.handleSalaryChange} />
      <div className="result-jobs">
        {this.state.jobsByFilter.map((item, key) =>{
          if(item[1].length!==0){
          return (
            <div className="container" key={key}>
              <h1>
                {(() => {
                  switch (item[0]) {
                    case "jobsSearchResult":
                      return "Result Jobs";
                    case "jobsInRelatedSkill":
                      return "Jobs Related";
                    case "jobsAfterNormalize":
                      return "Job Normalize";
                  }
                })()}
              </h1>

              <div className="row">
                <div className="col-12">
                  <div className="card card-margin">
                    <div className="card-body">
                      <div className="row search-body">
                        <div className="col-lg-12">
                          <div className="search-result">
                            <div className="result-header">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="records">
                                    Showing: <b>{item[1].length}</b> result
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="result-actions" />
                                </div>
                              </div>
                            </div>
                            <div className="result-body">
                              <div className="table-responsive">
                                <table className="table widget-26">
                                  <thead>
                                    <tr>
                                      <td
                                        style={{
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Tên công việc
                                      </td>
                                      <td
                                        style={{
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Địa chỉ
                                      </td>
                                      <td
                                        style={{
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Lương
                                      </td>
                                      <td
                                        style={{
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Skill
                                      </td>
                                    </tr>
                                  </thead>
                                  {item[1].map((job) => (
                                    <tbody key={job.ma_cong_viec}>
                                      <tr>
                                        <td>
                                          <div className="widget-26-job-title">
                                            <Link
                                              to={`/job/?ma_dn=${job.ma_doanh_nghiep}&ma_cv=${job.ma_cong_viec}`}
                                            >
                                              {job.ten_cong_viec}
                                            </Link>
                                            <p className="m-0">
                                              <a href="/" className="employer-name">
                                                {job.ten_cong_ty}
                                              </a>{" "}
                                              <br />
                                              <span className="text-muted time">
                                                {this.changeDate(
                                                  job.ngay_bat_dau
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="widget-26-job-info">
                                            <p className="text-muted m-0">
                                              <span className="location">
                                                {job.dia_chi}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="widget-26-job-salary">
                                            {job.luong_toi_da
                                              ? job.luong_toi_da
                                              : `You'll love it!`}
                                          </div>
                                        </td>
                                        <td>
                                          {job.skills.map((skill, key) => (
                                            <div
                                              className="widget-26-job-category bg-soft-base"
                                              key={key}
                                            >
                                              <i className="indicator bg-info" />
                                              <span>{skill}</span>
                                              <br />
                                            </div>
                                          ))}
                                        </td>
                                        <td>
                                          <div className="widget-26-job-starred">
                                            <a href="/">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-star"
                                              >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                              </svg>
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  ))}
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          );
        }})}
        <Pagination
          onPageChange={this.handlePageChange}
          pageIndex={this.state.pageIndex}
          totalRecord={this.state.totalRecord}
          skipRelatedRecords={this.state.skipRelatedRecords}
          skipNormalizeRecords={this.state.skipNormalizeRecords}
        />
      </div>
    
      </div>
    )
  }
}

export default SearchResult;
