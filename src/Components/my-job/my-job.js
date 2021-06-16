import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import _, { join } from 'lodash';
import {
  getMyJob,
  getToken
} from '../../services/api.js';
import './my-job.scoped.css';

export class MyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15,
      job_data: {
        data: {
          pageIndex: 0,
          totalRecord: 0,
          pageSize: 0
        }
      },
      myJobLists: [
        {
          listSkills: []
        }
      ]
    };
    this.getMyFavoriteJobs = this.getMyFavoriteJobs.bind(this);
    this.groupJobBySkill = this.groupJobBySkill.bind(this);
  }

  async componentDidMount() {
    await this.getMyFavoriteJobs(1);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.getMyFavoriteJobs(pageNumber);
  }

  async getMyFavoriteJobs(pageIndex) {
    let data = await getMyJob(pageIndex - 1);
    this.setState({ myJobLists: data.data });
    this.groupJobBySkill();
  }

groupJobBySkill(){
  let originData = this.state.myJobLists;
  let groupSkillData = _.uniqBy(this.state.myJobLists, 'ma_cong_viec');
  _.each(groupSkillData, function(i){
    i.listSkills = [];
    _.each(originData, function(j){
      if(i.ma_cong_viec === j.ma_cong_viec && j.ma_skill != 0){
        i.listSkills.push(j.ten_skill);
      }
    })
  })
  
  this.setState({ myJobLists: groupSkillData});
  console.log(this.state.myJobLists);
}
  render() {
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="card card-margin">
                <div class="card-body">
                  <div class="row search-body">
                    <div class="col-lg-12">
                      <div class="search-result">
                        <div class="result-header">
                          <div class="row">
                            <div class="col-lg-6">
                            </div>
                            <div class="col-lg-6">
                              <div class="result-actions">
                                <div class="result-sorting">
                                  
                                </div>
                                <div class="result-views">
                                  <button type="button" class="btn btn-soft-base btn-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      class="feather feather-list"
                                    >
                                      <line x1="8" y1="6" x2="21" y2="6"></line>
                                      <line x1="8" y1="12" x2="21" y2="12"></line>
                                      <line x1="8" y1="18" x2="21" y2="18"></line>
                                      <line x1="3" y1="6" x2="3" y2="6"></line>
                                      <line x1="3" y1="12" x2="3" y2="12"></line>
                                      <line x1="3" y1="18" x2="3" y2="18"></line>
                                    </svg>
                                  </button>
                                  <button type="button" class="btn btn-soft-base btn-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      class="feather feather-grid"
                                    >
                                      <rect x="3" y="3" width="7" height="7"></rect>
                                      <rect x="14" y="3" width="7" height="7"></rect>
                                      <rect x="14" y="14" width="7" height="7"></rect>
                                      <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="result-body">
                          <div class="table-responsive">
                            <table class="table widget-26">
                              <thead>
                                <th>Tên công việc</th>
                                <th>Mức lương</th>
                                <th>Skill</th>
                              </thead>
                              <tbody>
                                {this.state.myJobLists.map((job, i) => 
                                <tr key={i}>
                                  <td>
                                    <div class="widget-26-job-title">
                                    <Link
																										to={`/job?ma_dn=${
																											job.ma_doanh_nghiep
																										}&ma_cv=${
																											job.ma_cong_viec
																										}`}
																									>
																										{
																											job.ten_cong_viec
																										}
																									</Link>
                                      <p class="m-0"><a href="#" class="employer-name">{job.dia_chi}</a> <span class="text-muted time">1 days ago</span></p>
                                    </div>
                                  </td>
                                 
                                  <td>
                                    <div class="widget-26-job-salary">{job.luong_toi_thieu}-{job.luong_toi_da} {job.don_vi_tien_te}</div>
                                  </td>
                                  <td>
                                  {job.listSkills && job.listSkills.map((skill) => 
                                    <div class="widget-26-job-category bg-soft-base">
                                      <i class="indicator bg-info"></i>
                                      <span>{skill}</span>
                                    </div>
                                    )}
                                  </td>
                                  <td>
                                    <div class="widget-26-job-starred">
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          class="feather feather-star"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                               )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <nav class="d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.job_data.data.pageIndex + 1}
                      itemsCountPerPage={this.state.job_data.data.pageSize}
                      totalItemsCount={this.state.job_data.data.totalRecord}
                      pageRangeDisplayed={5}
                      itemClass="page-item"
                      linkClass="page-link"
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}