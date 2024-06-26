import './AllStyles.css';

const ImageComponent = ({ src, alt }) => {
    return (
      <div className="image-container">
        <img src={src} alt={alt} />
      </div>
    );
  };
  
  export default ImageComponent;