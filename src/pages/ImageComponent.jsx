import { useState } from "react";
import { ClipLoader } from "react-spinners";
import "./AllStyles.css";

const ImageComponent = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <div className="image-container">
      {loading && (
        <ClipLoader
          size={60}
          color={"#c9ce8c"}
          loading={loading}
          speedMultiplier={1}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
};

export default ImageComponent;
