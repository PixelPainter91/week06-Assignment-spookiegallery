import React, { useEffect, useState } from "react";
import "../Gallery/Gallery.css";
import ImageContainer from "../ImageContainer/ImageContainer";

export default function GallerySideScroll() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(
          "https://api.unsplash.com/collections/GlE-DjjtZ2k/photos?per_page=30",
          {
            headers: {
              Authorization: `Client-ID ${
                import.meta.env.VITE_UNSPLASH_ACCESS_KEY
              }`,
            },
          }
        );

        const data = await response.json();

        const mappedImages = data.map((img) => ({
          thumb: img.urls.thumb,
          full: img.urls.full,
          description: img.alt_description || "Unsplash photo",
        }));

        setImages(mappedImages);
      } catch (error) {
        console.error("Failed to load Unsplash collection:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="gallery">
      <div className="thumbnailGrid">
        {images.map((img, index) => (
          <ImageContainer
            key={index}
            imageSource={img.thumb}
            description={img.description}
            onClick={() => setSelectedImage(img.full)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="overlay" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Full size"
            className="overlay-image"
          />
        </div>
      )}
    </div>
  );
}
