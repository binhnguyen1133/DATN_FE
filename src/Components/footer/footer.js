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
            <h2 className="contact">Contact Us</h2>
            <form method="post" action="#">
              <div className="fields">
                <div className="field half">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>

                <div className="field half">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>

                <div className="field">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                  />
                </div>

                <div className="field">
                  <textarea
                    name="message"
                    id="message"
                    rows="3"
                    placeholder="Notes"
                  />
                </div>

                <div className="field text-right">
                  <label>&nbsp;</label>

                  <ul className="actions">
                    <li>
                      <input
                        type="submit"
                        value="Send Message"
                        className="primary"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
          <section>
            <h2 className="contact">Contact Info</h2>

            <ul className="alt">
              <li>
                <span className="fa fa-envelope-o" />{" "}
                <a href="/">contact@company.com</a>
              </li>
              <li>
                <span className="fa fa-phone" /> +1 333 4040 5566{" "}
              </li>
              <li>
                <span className="fa fa-map-pin" /> 212 Barrington Court New
                York, ABC 10001 United States of America
              </li>
            </ul>

            <h2>Follow Us</h2>

            <ul className="icons">
              <li>
                <a href="/" className="icon style2 fa-twitter">
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="/" className="icon style2 fa-facebook">
                  <span className="label">Facebook</span>
                </a>
              </li>
              <li>
                <a href="/" className="icon style2 fa-instagram">
                  <span className="label">Instagram</span>
                </a>
              </li>
              <li>
                <a href="/" className="icon style2 fa-linkedin">
                  <span className="label">LinkedIn</span>
                </a>
              </li>
            </ul>
          </section>

          <ul className="copyright">
            <li>Copyright © 2020 Company Name </li>
            <li>
              Template by:{" "}
              <a href="https://www.phpjabbers.com/">PHPJabbers.com</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
