import React from "react";
import "./home.css";

export class Home extends React.Component {
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
                src="http://www.launchdreambusiness.com/wp-content/uploads/2020/06/selection-process-pillar-page-featured-2048x1133.jpg"
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
                Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod
                sit amet nisi euismod sed cursus arcu elementum ipsum arcu
                vivamus quis venenatis orci lorem ipsum et magna feugiat
                veroeros aliquam. Lorem ipsum dolor sit amet nullam dolore.
              </p>
            </header>

            <br />

            <h2 className="contact">FEATURED JOBS</h2>

            <section className="tiles">
              <article className="style1">
                <span className="image">
                  <img
                    src="https://img.etimg.com/thumb/msid-72286577,width-300,imgsize-97853,,resizemode-4,quality-100/jobs-hiring-agencies.jpg"
                    alt=""
                  />
                </span>
                <a href="job-details.html">
                  <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                  <p>
                    <strong>$60 000</strong>
                  </p>

                  <p>
                    <i className="fa fa-calendar" /> 15-06-2020
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file" /> Contract
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-map-marker" /> London
                  </p>
                </a>
              </article>
              <article className="style2">
                <span className="image">
                  <img
                    src="https://img.etimg.com/thumb/msid-72286577,width-300,imgsize-97853,,resizemode-4,quality-100/jobs-hiring-agencies.jpg"
                    alt=""
                  />
                </span>
                <a href="job-details.html">
                  <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                  <p>
                    <strong>$60 000</strong>
                  </p>

                  <p>
                    <i className="fa fa-calendar" /> 15-06-2020
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file" /> Contract
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-map-marker" /> London
                  </p>
                </a>
              </article>
              <article className="style3">
                <span className="image">
                  <img
                    src="https://img.etimg.com/thumb/msid-72286577,width-300,imgsize-97853,,resizemode-4,quality-100/jobs-hiring-agencies.jpg"
                    alt=""
                  />
                </span>
                <a href="job-details.html">
                  <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                  <p>
                    <strong>$60 000</strong>
                  </p>

                  <p>
                    <i className="fa fa-calendar" /> 15-06-2020
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file" /> Contract
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-map-marker" /> London
                  </p>
                </a>
              </article>

              <article className="style4">
                <span className="image">
                  <img
                    src="https://img.etimg.com/thumb/msid-72286577,width-300,imgsize-97853,,resizemode-4,quality-100/jobs-hiring-agencies.jpg"
                    alt=""
                  />
                </span>
                <a href="job-details.html">
                  <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                  <p>
                    <strong>$60 000</strong>
                  </p>

                  <p>
                    <i className="fa fa-calendar" /> 15-06-2020
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file" /> Contract
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-map-marker" /> London
                  </p>
                </a>
              </article>

              <article className="style5">
                <span className="image">
                  <img
                    src="https://img.etimg.com/thumb/msid-72286577,width-300,imgsize-97853,,resizemode-4,quality-100/jobs-hiring-agencies.jpg"
                    alt=""
                  />
                </span>
                <a href="job-details.html">
                  <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                  <p>
                    <strong>$60 000</strong>
                  </p>

                  <p>
                    <i className="fa fa-calendar" /> 15-06-2020
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file" /> Contract
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-map-marker" /> London
                  </p>
                </a>
              </article>

              <article className="style6">
                <span className="image">
                  <img
                    src="https://img.etimg.com/thumb/msid-72286577,width-300,imgsize-97853,,resizemode-4,quality-100/jobs-hiring-agencies.jpg"
                    alt=""
                  />
                </span>
                <a href="job-details.html">
                  <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                  <p>
                    <strong>$60 000</strong>
                  </p>

                  <p>
                    <i className="fa fa-calendar" /> 15-06-2020
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file" /> Contract
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-map-marker" /> London
                  </p>
                </a>
              </article>
            </section>

            <p className="text-center">
              <a href="jobs.html">
                View Jobs &nbsp;
                <i className="fa fa-long-arrow-right" />
              </a>
            </p>

            <br />

            <h2 className="h2">Testimonials</h2>

            <div className="row">
              <div className="col-sm-6 text-center">
                <p className="m-n">
                  <em>
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt delectus mollitia, debitis architecto recusandae?
                    Quidem ipsa, quo, labore minima enim similique, delectus
                    ullam non laboriosam laborum distinctio repellat quas
                    deserunt voluptas reprehenderit dignissimos voluptatum
                    deleniti saepe. Facere expedita autem quos."
                  </em>
                </p>

                <p>
                  <strong> - John Doe</strong>
                </p>
              </div>

              <div className="col-sm-6 text-center">
                <p className="m-n">
                  <em>
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt delectus mollitia, debitis architecto recusandae?
                    Quidem ipsa, quo, labore minima enim similique, delectus
                    ullam non laboriosam laborum distinctio repellat quas
                    deserunt voluptas reprehenderit dignissimos voluptatum
                    deleniti saepe. Facere expedita autem quos."
                  </em>
                </p>

                <p>
                  <strong>- John Doe</strong>{" "}
                </p>
              </div>
            </div>

            <p className="text-center">
              <a href="testimonials.html">
                Read More &nbsp;
                <i className="fa fa-long-arrow-right" />
              </a>
            </p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
