import React from "react";
import "./footer.scoped.css";

export class Footer extends React.Component {
  componentDidMount() {
    // console.log('Footer created');
  }

  render() {
    return (
      <footer id="footer">
        <div className="inner">
          <section>
            <h2 className="contact">JOB AGENCY WEBSITE</h2>
       
              <div className="fields">
                <div className="field half">
                  <a  href="/" name="name" id="name" >Home Page</a>
                </div>
                <div className="field half">
                  <span  name="email"id="email"> </span>
                </div>
                <div className="field">
                  <a href="./about"name="subject" id="subject">About Us</a>
                </div>
               <div className="field text-right">
                  <label>&nbsp;</label>
                </div>
              </div>

          </section>
          <section>
            <h2 className="contact">Contact Info</h2>

            <ul className="alt">
              <li>
                <span className="fa fa-envelope-o" />{" "}
                <a href="mailto: timkiemvieclam2021@gmail.com ">timkiemvieclam2021@gmail.com</a>
              </li>
              <li>
              <span className="fa fa-facebook"/>{" "}
              <a href="https://www.facebook.com/jobagency.2021" > JOB AGENCY PAGE</a>
              </li>
              <li>
                <span className="fa fa-phone" /> +84 520 131415{" "}
              </li>
              <li>
                <span className="fa fa-map-pin" /> 227 Nguyen Van Cu, F4, D5 Ho Chi Minh City
              </li>
             
            </ul>

            
          
          </section>

          <ul className="copyright">
            <li>Copyright JOB AGENCY WEBSITE</li>
            <li>
              {" "}
              <a href="https://www.timkiemvieclam.tech/">www.timkiemvieclam.tech</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
