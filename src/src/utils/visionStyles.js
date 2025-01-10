// Function to inject vision difficulty-based styles into the iframe
export const injectVisionStyles = (iframeDoc, visionDifficulty) => {
  if (!iframeDoc) return;

  // Remove previous vision difficulty styles by targeting the specific ID
  const existingStyleTag = iframeDoc.querySelector(
    "#PIXLESHIFT_PB_VISION_STYLES"
  );
  if (existingStyleTag) {
    existingStyleTag.remove();
  }

  // Create a new style tag to inject vision difficulty styles
  const styleTag = iframeDoc.createElement("style");
  styleTag.id = "PIXLESHIFT_PB_VISION_STYLES"; // Assign a unique ID to the style tag
  iframeDoc.head.appendChild(styleTag);

  switch (visionDifficulty) {
    case "deuteranopia":
      styleTag.innerHTML = `
          body {
            filter: sepia(100%) saturate(200%) hue-rotate(90deg);
          }
        `;
      break;

    case "protanopia":
      styleTag.innerHTML = `
          body {
            filter: sepia(100%) saturate(200%) hue-rotate(180deg);
          }
        `;
      break;

    case "tritanopia":
      styleTag.innerHTML = `
          body {
            filter: sepia(100%) saturate(200%) hue-rotate(270deg);
          }
        `;
      break;

    case "high-contrast":
      styleTag.innerHTML = `
          body {
            background-color: black !important;
            color: white !important;
            filter: contrast(200%) !important;
          }
          a {
            color: yellow !important;
          }
        `;
      break;

    case "night-mode":
      styleTag.innerHTML = `
          body {
            background-color: #121212 !important;
            color: #E0E0E0 !important;
          }
          a {
            color: #BB86FC !important;
          }
        `;
      break;

    case "low-vision":
      styleTag.innerHTML = `
          body {
            font-size: 18px !important;
            line-height: 1.6 !important;
          }
        `;
      break;

    default:
      break;
  }
};
