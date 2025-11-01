/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  /*---------------------------------------------------- */
  /* Preloader
	------------------------------------------------------ */
  $(window).load(function () {
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");
    });
  });

  /*---------------------------------------------------- */
  /* FitText Settings
  	------------------------------------------------------ */
  setTimeout(function () {
    $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
  }, 100);

  /*---------------------------------------------------- */
  /* FitVids
	------------------------------------------------------ */
  $(".fluid-video-wrapper").fitVids();

  /*---------------------------------------------------- */
  /* Owl Carousel
	------------------------------------------------------ */
  $("#owl-slider").owlCarousel({
    navigation: false,
    pagination: true,
    itemsCustom: [
      [0, 1],
      [700, 2],
      [960, 3],
    ],
    navigationText: false,
  });

  /*----------------------------------------------------- */
  /* Alert Boxes
  	------------------------------------------------------- */
  $(".alert-box").on("click", ".close", function () {
    $(this).parent().fadeOut(500);
  });

  /*----------------------------------------------------- */
  /* Stat Counter
  	------------------------------------------------------- */
  var statSection = $("#stats"),
    stats = $(".stat-count");

  statSection.waypoint({
    handler: function (direction) {
      if (direction === "down") {
        stats.each(function () {
          var $this = $(this);

          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 4000,
              easing: "swing",
              step: function (curValue) {
                $this.text(Math.ceil(curValue));
              },
            }
          );
        });
      }

      // trigger once only
      this.destroy();
    },

    offset: "90%",
  });

  /*---------------------------------------------------- */
  /*	Masonry
	------------------------------------------------------ */
  var containerProjects = $("#folio-wrapper");

  containerProjects.imagesLoaded(function () {
    containerProjects.masonry({
      itemSelector: ".folio-item",
      resize: true,
    });
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
	------------------------------------------------------*/
  $(".item-wrap a").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: "mfp-fade",
  });

  $(document).on("click", ".popup-modal-dismiss", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*-----------------------------------------------------*/
  /* Navigation Menu
   ------------------------------------------------------ */
  var toggleButton = $(".menu-toggle"),
    nav = $(".main-navigation");

  // toggle button
  toggleButton.on("click", function (e) {
    e.preventDefault();
    toggleButton.toggleClass("is-clicked");
    nav.slideToggle();
  });

  // nav items
  nav.find("li a").on("click", function () {
    // update the toggle button
    toggleButton.toggleClass("is-clicked");
    // fadeout the navigation panel
    nav.fadeOut();
  });

  /*---------------------------------------------------- */
  /* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
  var sections = $("section"),
    navigation_links = $("#main-nav-wrap li a");

  sections.waypoint({
    handler: function (direction) {
      var active_section;

      active_section = $("section#" + this.element.id);

      if (direction === "up") active_section = active_section.prev();

      var active_link = $(
        '#main-nav-wrap a[href="#' + active_section.attr("id") + '"]'
      );

      navigation_links.parent().removeClass("current");
      active_link.parent().addClass("current");
    },

    offset: "25%",
  });

  /*---------------------------------------------------- */
  /* Smooth Scrolling
  	------------------------------------------------------ */
  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /*---------------------------------------------------- */
  /*  Placeholder Plugin Settings
	------------------------------------------------------ */
  $("input, textarea, select").placeholder();

  /*---------------------------------------------------- */
  /*	contact form
	------------------------------------------------------ */

  /* EmailJS contact form submission */
  $(document).ready(function () {
    emailjs.init('1BrKWedfyV4KlnKOy');
    
    $("#contactForm").on('submit', function(e) {
      e.preventDefault();
      
      // Show loading spinner
      $("#submit-loader").fadeIn();
      $("#message-warning").hide();
      $("#message-success").hide();
      
      // Get form data
      const formData = {
        name: $("#contactName").val().trim(),
        email: $("#contactEmail").val().trim(),
        subject: $("#contactSubject").val().trim() || 'New Contact from Portfolio',
        message: $("#contactMessage").val().trim()
      };
      
      // Basic client-side validation
      if (!formData.name || !formData.email || !formData.message) {
        $("#submit-loader").fadeOut();
        $("#message-warning").text("Please fill in all required fields.").fadeIn();
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        $("#submit-loader").fadeOut();
        $("#message-warning").text("Please enter a valid email address.").fadeIn();
        return;
      }
      
      // Name validation
      if (formData.name.length < 2) {
        $("#submit-loader").fadeOut();
        $("#message-warning").text("Name must be at least 2 characters long.").fadeIn();
        return;
      }
      
      // Message validation
      if (formData.message.length < 10) {
        $("#submit-loader").fadeOut();
        $("#message-warning").text("Message must be at least 10 characters long.").fadeIn();
        return;
      }
      
      // Send email using EmailJS
      emailjs.send('service_z51rmrb', 'template_luqwsrp', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      
      })
      .then(function(response) {
        $("#submit-loader").fadeOut();
        $("#message-success").text("Thank you! Your message has been sent successfully.").fadeIn();
        $("#contactForm")[0].reset();
        
        setTimeout(function() {
          $("#message-success").fadeOut();
        }, 5000);
        
        console.log('Email sent successfully:', response);
      })
      .catch(function(error) {
        $("#submit-loader").fadeOut();
        
        console.error('EmailJS error details:', error);
        console.error('Error status:', error.status);
        console.error('Error text:', error.text);
        
        let errorMessage = "Sorry, there was an error sending your message. ";
        
        if (error.status === 412) {
          errorMessage += "EmailJS service not configured properly. Please check your service configuration.";
        } else if (error.status === 400) {
          errorMessage += "Invalid email template or service ID. Please verify your EmailJS settings.";
        } else if (error.status === 401) {
          errorMessage += "Authentication failed. Please check your EmailJS public key.";
        } else if (error.status === 402) {
          errorMessage += "EmailJS quota exceeded. Please upgrade your plan or try again later.";
        } else if (error.status === 403) {
          errorMessage += "Access forbidden. Please check your EmailJS service permissions.";
        } else if (error.status === 404) {
          errorMessage += "EmailJS service or template not found. Please verify your IDs.";
        } else if (error.text && error.text.includes('Template')) {
          errorMessage += "Template configuration error. Please check your email template variables.";
        } else {
          errorMessage += "Network or server error. Please try again later.";
        }
        
        $("#message-warning").html(errorMessage + "<br><small>Error details logged to console (F12)</small>").fadeIn();
      });
    });
  });

  /*----------------------------------------------------- */
  /* Back to top
   ------------------------------------------------------- */
  var pxShow = 300;
  var fadeInTime = 400;
  var fadeOutTime = 400;
  var scrollSpeed = 300;

  jQuery(window).scroll(function () {
    if (!$("#header-search").hasClass("is-visible")) {
      if (jQuery(window).scrollTop() >= pxShow) {
        jQuery("#go-top").fadeIn(fadeInTime);
      } else {
        jQuery("#go-top").fadeOut(fadeOutTime);
      }
    }
  });

  /*----------------------------------------------------- */
  /* Theme Toggle
  	------------------------------------------------------- */
  const currentTheme = localStorage.getItem('theme') || 'dark';
  const html = document.documentElement;
  
  if (currentTheme === 'light') {
    html.classList.remove('dark-mode');
  } else {
    html.classList.add('dark-mode');
  }

  $('#theme-toggle-btn').on('click', function() {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark-mode');
    
    if (isDarkMode) {
      html.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      console.log('Switched to light mode');
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      console.log('Switched to dark mode');
    }
    
    window.dispatchEvent(new Event('themeChanged'));
  });

  /*----------------------------------------------------- */
  /* Mobile Navigation Toggle
  	------------------------------------------------------- */
  $('#nav-toggle').on('click', function() {
    $(this).toggleClass('active');
    $('#nav-menu').toggleClass('active');
  });

  $('.nav-link').on('click', function() {
    $('#nav-toggle').removeClass('active');
    $('#nav-menu').removeClass('active');
  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest('.nav-container').length) {
      $('#nav-toggle').removeClass('active');
      $('#nav-menu').removeClass('active');
    }
  });

})(jQuery);
