import React from 'react';
import CalendlyInlineWidget from '../components/CalendlyInlineWidget';
 // Adjust the path as needed

function MyBookingPage() {
  return (
    <div>
      <h1>Schedule a Meeting</h1>
      <p>Please pick a time slot below:</p>
      {/* Use the component */}
      <CalendlyInlineWidget />

      {/* You can also override props if you designed it that way */}
      {/* <CalendlyInlineWidget url="https://calendly.com/your-other-event" height="600px" /> */}

      <p>Looking forward to speaking with you!</p>
    </div>
  );
}

export default MyBookingPage;