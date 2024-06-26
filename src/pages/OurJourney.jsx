import ImageComponent from "./ImageComponent";

const images = [{ src: "/images/ourJourneyImage.jpg", alt: "hero image 1" }];

function OurJourney() {
  return (
    <>
      <div className="oj-bg-color">
        <div className="ourjourney-parent">
          <div className="ourjourney-holder">
            <h2>Our Journey</h2>
            <span>
              Embark on a transformative experience with GraceGuide, a
              pioneering app that has redefined the way you connect with the
              Bible and Quran. Since our inception, we have been dedicated to
              enhancing your spiritual growth through our innovative platform.
            </span>
          </div>

          <div className="ourJourney-discoveryHolder">
            <p>
              Discover the evolution of GraceGuide, a revolutionary app that has
              revolutionized the way you engage with sacred texts. Since 2000,
              we have been committed to enriching your spiritual journey with
              our diverse range of features and services.
            </p>
            <button>Learn More</button>
            <ImageComponent src={images[0].src} alt={images[0].alt} />
          </div>
          <div className="getAnswer-parent">
            <h2>Get Answers</h2>
            <p>Your Source of Guidance</p>
            <hr color="#c9ce8c" />
            <div className="getAnswer-text-info">
              <p>
                At GraceGuide, we prioritize your needs. With a focus on
                exceptional service, we aim to address all your queries. Since
                2000, GraceGuide has emerged as a leading app in the mobile
                realm, offering a plethora of services to simplify your
                spiritual quest. Reach out to us today and experience the
                difference!
              </p>
              <hr color="#c9ce8c" />
              <div className="getAnswers-quest-parent">
                <div className="getAnswers-eachQuest-holder">
                  <p className="getAnswer-bold">Why Choose GraceGuide over other similar apps?</p>
                  <p>
                    Explore the uniqueness of GraceGuide by delving into our
                    tailored features and services. Our commitment to excellence
                    sets us apart in the digital landscape, ensuring a seamless
                    experience for our users.
                  </p>
                </div>
                <hr color="#c9ce8c" />
                <div className="getAnswers-eachQuest-holder">
                  <p className="getAnswer-bold">Curious about the functionalities of GraceGuide?</p>
                  <p>
                    Uncover the capabilities of GraceGuide through our array of
                    features and tools. From multiple text versions to
                    personalized options, our app is designed to elevate your
                    spiritual practice.
                  </p>
                </div>
                <hr color="#c9ce8c" />
                <div className="getAnswers-eachQuest-holder">
                  <p className="getAnswer-bold">Stay Updated</p>
                  <p>
                    Keep abreast of the latest developments with GraceGuide. Our
                    commitment to continuous improvement ensures regular updates
                    to enhance your spiritual journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurJourney;
