import "./AllStyles.css";
import NewsLetterSubscription from "./NewsLetterSubscription";

function Footer() {
  return (
    <div className="footer-parent">
      <hr color="#c9ce8c" />
      <div className="footer-flex">
        <h2>GraceGuide</h2>
        <div className="footer-info-holder">
          <div className="footer-addy-cont-holder">
            <span className="footerDetail">
              <p>123-456-7890</p>
              <p>info@mysite.com</p>
            </span>
            <span className="footerDetail">
              <p>500 Terry Francine Street,</p>
              <p>6th Floor, San Francisco,</p>
              <p>CA 94158</p>
            </span>
          </div>
          <div className="footer-sub-text">
            <p>Stay informed,</p>
            <p>subscribe to our newsletter</p>
          </div>
         <NewsLetterSubscription />
        </div>
      </div>
      <hr color="#c9ce8c" />
      {/* <span className="rightsText">©2024 Joelinton, Inc. (Earl Morningstar). All Rights Reserved</span> */}
    </div>
  );
}

export default Footer;
