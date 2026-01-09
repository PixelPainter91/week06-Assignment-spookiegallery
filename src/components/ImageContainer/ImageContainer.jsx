const ImageContainer = ({ imageSource, description, onClick }) => {
  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  }

  return (
    <div
      className="image-container"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={description}
      onKeyDown={handleKeyDown}
    >
      <img className="image" src={imageSource} alt={description} />
      <p className="date">{description}</p>
    </div>
  );
};

export default ImageContainer;


