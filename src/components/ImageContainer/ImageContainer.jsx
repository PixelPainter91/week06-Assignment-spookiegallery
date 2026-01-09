const ImageContainer = ({ imageSource, description, onClick }) => {
  return (
    <div className="image-container" onClick={onClick}>
      <img className="image" src={imageSource} alt={description} />
      <p className="date">{description}</p>
    </div>
  );
};

export default ImageContainer;
