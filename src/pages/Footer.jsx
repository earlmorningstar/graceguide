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
              {/* <p>123-456-7890</p> */}
              <p>onyeaborjoel@gmail.com</p>
            </span>
            <span className="footerDetail">
              <p>Address To Be Placed Right Here,</p>
              <p>Country,</p>
              <p>012345 EM.</p>
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
         </div>
  );
}

export default Footer;
