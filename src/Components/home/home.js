import React from "react";
import "./home.scoped.css";
import axios from 'axios';
import {Link} from 'react-router-dom';

export class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jobsPopular: [],
    }
    this.changeDate = this.changeDate.bind(this);
  }
  
  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_POPULAR}`)
      .then(response =>{
          // console.log(response.data.data);
          this.setState({
            jobsPopular: response.data.data
          })
      })
      .then(()=>{console.log(this.state.jobsPopular)})
      .catch((error)=>{
          console.log(error);
      })
  }

  changeDate(date) {
		var newDate = new Date(date);
		return newDate.toDateString();
	}

  render() {
    return (
      <div>
        {/* SLIDER */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://www.resumesbyjoyce.com/wp-content/uploads/2019/11/Help-with-writing-an-executive-resume.jpg"
                height="560!important"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-orange-talent-recruitment-poster-background-image_138870.jpg"
                height="560!important"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://previews.123rf.com/images/vasilyrosca/vasilyrosca2002/vasilyrosca200200299/140724644-we-hiring-now-banner-job-offer-vector-background-hiring-promotion-megaphone-employee-illustration.jpg"
                height="560!important"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span className="sr-only">Next</span>
          </a>
        </div>
        <br />
        <br />
        {/* MAIN HOMEPAGE */}
        <div className="wrap">
          <div className="inner">
            <header id="inner">
              <h1>Find your perfect job!</h1>
              <p>
                Cung cấp giải pháp tiện lợi, giúp mọi người tiếp cận được các công việc phù hợp với bản thân cũng như theo dõi được sự thay đổi của nhu cầu thị trường trong tương lai
              </p>
            </header>

            <br />

            <h2 className="contact">FEATURED JOBS</h2>

            <section className="tiles">
              {this.state.jobsPopular.map((job) =>{
                return(
                    <article className="style1" key={job.ma_cong_viec}>
                      <span className="image">
                        <div className="img"
                        />
                      </span>
                      <Link to={`/job/?ma_dn=${job.ma_doanh_nghiep}&ma_cv=${job.ma_cong_viec}`}>
                        <h2>{job.ten_cong_viec}</h2>
                        <p>
                          <strong>{job.luong_toi_da ? job.luong_toi_da+'$' : `You'll love it.`}</strong>
                        </p>

                        <p>
                          <i className="fa fa-calendar" /> {this.changeDate(job.ngay_bat_dau)}
                        </p>
                      </Link>
                    </article>
                  )
              })}
            </section>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
