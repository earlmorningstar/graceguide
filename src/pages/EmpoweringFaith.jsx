import './AllStyles.css';
import ImageComponent from './ImageComponent';

const images = [
    { src: "/images/hero-img-sub.jpg", alt: "hero image 1" },
  ];

function EmpoweringFaith(){
    return(<>
    <div className='heroSection'>
        <h1>Empowering Faith</h1>
        <span>Guiding Your Spiritual Journey</span>
    </div>
    <ImageComponent src={images[0].src} alt={images[0].alt} />

    </>)
}

export default EmpoweringFaith;