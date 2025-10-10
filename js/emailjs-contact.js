// js/emailjs-contact.js
// EmailJS Contact Form Integration (Free Alternative)

// Initialize EmailJS
(function() {
  emailjs.init("YOUR_EMAILJS_USER_ID"); // Get from emailjs.com
})();

// Enhanced contact form handler with EmailJS
function initEmailJSContact() {
  $(document).ready(function() {
    $("#contactForm").off('submit').on('submit', function(e) {
      e.preventDefault();
      
      // Show loading spinner
      $("#submit-loader").fadeIn();
      $("#message-warning").hide();
      $("#message-success").hide();
      
      // Get form data
      const formData = {
        from_name: $("#contactName").val().trim(),
        from_email: $("#contactEmail").val().trim(),
        subject: $("#contactSubject").val().trim() || 'New Contact from Portfolio',
        message: $("#contactMessage").val().trim(),
        to_email: 'vt.gowreesh43@gmail.com'
      };
      
      // Basic client-side validation
      if (!formData.from_name || !formData.from_email || !formData.message) {
        $("#submit-loader").fadeOut();
        $("#message-warning").text("Please fill in all required fields.").fadeIn();
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.from_email)) {
        $("#submit-loader").fadeOut();
        $("#message-warning").text("Please enter a valid email address.").fadeIn();
        return;
      }
      
      // Send email using EmailJS
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(function(response) {
          $("#submit-loader").fadeOut();
          $("#message-success").text("Thank you for your message! I will get back to you soon.").fadeIn();
          $("#contactForm")[0].reset(); // Clear the form
          
          // Auto-hide success message after 5 seconds
          setTimeout(function() {
            $("#message-success").fadeOut();
          }, 5000);
          
          console.log('Email sent successfully:', response);
        })
        .catch(function(error) {
          $("#submit-loader").fadeOut();
          let errorMessage = "Sorry, there was an error sending your message. Please try again later.";
          $("#message-warning").text(errorMessage).fadeIn();
          
          console.error('Email sending failed:', error);
        });
    });
  });
}

// Auto-initialize if EmailJS is available
if (typeof emailjs !== 'undefined') {
  initEmailJSContact();
} else {
  // Fallback to original Firebase method
  console.log('EmailJS not loaded, using original contact method');
}