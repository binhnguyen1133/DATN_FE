import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
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
      myJobLists: []
    };
    this.getMyFavoriteJobs = this.getMyFavoriteJobs.bind(this);
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
    let jobLists = [];
    this.setState({ job_data: data });
    for(let i = 0; i<this.state.job_data.data.totalRecord; i++){
      const response = await fetch(`https://www.timkiemvieclam.tech/api/v1/jobs/${this.state.job_data.data.data[i].ma_cong_viec}`)
      const json = await response.json()
      jobLists.push(json)
    }
    this.setState({myJobLists: jobLists});
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
                              <div class="records">Find:  {this.state.job_data.data.totalRecord} result</div>
                            </div>
                            <div class="col-lg-6">
                              <div class="result-actions">
                                <div class="result-sorting">
                                  <span>Sort By:</span>
                                  <select class="form-control border-0" id="exampleOption">
                                    <option value="1">Relevance</option>
                                    <option value="2">Names (A-Z)</option>
                                    <option value="3">Names (Z-A)</option>
                                  </select>
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
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="Company"></img>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Senior Software Engineer / Developer</a>
                                      <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">1 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Full-Time</p>
                                      <p class="text-muted m-0">in <span class="location">London, UK</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 50/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-base">
                                      <i class="indicator bg-base"></i>
                                      <span>Software Development</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Company"></img>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Marketing &amp; Communication Supervisor</a>
                                      <p class="m-0"><a href="#" class="employer-name">AxiomUI Llc.</a> <span class="text-muted time">2 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 60/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-warning">
                                      <i class="indicator bg-warning"></i>
                                      <span>Marketing</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Senior Data Analyst / Scientist</a>
                                      <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">4 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 60/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-success">
                                      <i class="indicator bg-success"></i>
                                      <span>Artificial Intelligence</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="Company" ></img>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">UX Designer &amp; UI Developer</a>
                                      <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">5 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">Toronto, CAN</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 35/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-danger">
                                      <i class="indicator bg-danger"></i>
                                      <span>Design</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="Company" ></img>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Information Security Analyst / Expert</a>
                                      <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">6 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">Mumbai, IN</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 70/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-info">
                                      <i class="indicator bg-info"></i>
                                      <span>Infra Supervision</span>
                                    </div>
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
                                          class="feather feather-star starred"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Company" ></img>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Senior Software Engineer / Developer</a>
                                      <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">1 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Full-Time</p>
                                      <p class="text-muted m-0">in <span class="location">London, UK</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 50/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-base">
                                      <i class="indicator bg-base"></i>
                                      <span>Software Development</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Company"></img>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Marketing &amp; Communication Supervisor</a>
                                      <p class="m-0"><a href="#" class="employer-name">AxiomUI Llc.</a> <span class="text-muted time">2 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 60/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-warning">
                                      <i class="indicator bg-warning"></i>
                                      <span>Marketing</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Senior Data Analyst / Scientist</a>
                                      <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">4 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 60/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-success">
                                      <i class="indicator bg-success"></i>
                                      <span>Artificial Intelligence</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Company" />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">UX Designer &amp; UI Developer</a>
                                      <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">5 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">Toronto, CAN</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 35/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-danger">
                                      <i class="indicator bg-danger"></i>
                                      <span>Design</span>
                                    </div>
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
                                <tr>
                                  <td>
                                    <div class="widget-26-job-emp-img">
                                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Company" />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-title">
                                      <a href="#">Information Security Analyst / Expert</a>
                                      <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">6 days ago</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-info">
                                      <p class="type m-0">Part-Time</p>
                                      <p class="text-muted m-0">in <span class="location">Mumbai, IN</span></p>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-salary">$ 70/hr</div>
                                  </td>
                                  <td>
                                    <div class="widget-26-job-category bg-soft-info">
                                      <i class="indicator bg-info"></i>
                                      <span>Infra Supervision</span>
                                    </div>
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
                                          class="feather feather-star starred"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
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