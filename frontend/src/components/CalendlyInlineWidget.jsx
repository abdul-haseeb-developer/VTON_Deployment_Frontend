import React, { useEffect } from 'react';

/**
 * React component to embed a Calendly inline widget.
 * Loads the Calendly external script and displays the widget based on the provided URL.
 */
const CalendlyInlineWidget = ({
  url = "https://calendly.com/the-vtonx", // Default or specific Calendly link
  minWidth = "320px",
  height = "700px"
}) => {

  useEffect(() => {
    // Check if the Calendly script has already been added to prevent duplicates
    const scriptId = 'calendly-widget-script';
    if (document.getElementById(scriptId)) {
      // Optional: If the script exists but the widget isn't rendering,
      // you might need to call a Calendly refresh function if one exists.
      // Check Calendly's documentation for advanced JS API options.
      // For now, we assume if the script exists, it's handling widgets.
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.id = scriptId; // Add an ID for easier checking/cleanup
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Basic cleanup function: remove the script when the component unmounts
    // Note: More complex cleanup might be needed depending on how Calendly's
    // script behaves and if the component mounts/unmounts frequently.
    return () => {
      const addedScript = document.getElementById(scriptId);
      if (addedScript && document.body.contains(addedScript)) {
         // Consider potential side-effects before removing globally loaded scripts
         // document.body.removeChild(addedScript);
      }
      // Also, Calendly might add styles or other elements; a full cleanup
      // would ideally use an official API if available.
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial mount

  // Convert inline style string to a style object for React
  const widgetStyle = {
    minWidth: minWidth,
    height: height,
  };

  return (
    // Use className instead of class
    // Pass the style object to the style prop
    // Use the url prop for the data-url attribute
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={widgetStyle}
      // Adding a key might help React if URL changes, forcing re-render,
      // though the widget itself relies on the data-url attribute.
      // key={url}
    >
      {/* You can add a loading state here if desired */}
      {/* <p>Loading scheduling options...</p> */}
    </div>
  );
};

export default CalendlyInlineWidget;