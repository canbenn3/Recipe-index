import React, { CSSProperties, useEffect, useState } from "react";

export function ImageDisplay({ image }: { image: File | null }) {
  const [styling, setStyling] = useState<CSSProperties>({
    backgroundPosition: "center",
    backgroundSize: "cover",
  });
  useEffect(() => {
    if (image) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const uploadedImage = fileReader.result;
        setStyling((old) => {
          const newStyling = { ...old };
          newStyling.backgroundImage = `url(${uploadedImage})`;
          return newStyling;
        });
      };
      fileReader.readAsDataURL(image);
    }
  }, [image]);
  return (
    <div className="image-container">
      <div style={styling} className="image-display" />
    </div>
  );
}
