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
      var sectionId = this.element.id;
      if (!sectionId) return;

      var active_section = $("section#" + sectionId);
      if (direction === "up") active_section = active_section.prev();

      var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

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

  /* local validation */
  $(document).ready(function () {
    // Form validation only
    $("#contactForm").validate({
      submitHandler: function (form) {
        $("#submit-loader").fadeIn();
        form.submit(); // allow default FormSubmit to handle form
      }
    });

    // Show message after redirect
    const params = new URLSearchParams(window.location.search);
    const successMsg = document.getElementById("message-success");
    const errorMsg = document.getElementById("message-warning");

    if (params.get("status") === "success") {
      successMsg.style.display = "block";
    } else if (params.has("status")) {
      errorMsg.style.display = "block";
    }
  });

  /*----------------------------------------------------- */
  /* Back to top
   ------------------------------------------------------- */
  var pxShow = 300;
  var fadeInTime = 400;
  var fadeOutTime = 400;
  var scrollSpeed = 300;

  // Show or hide the sticky footer button
  jQuery(window).scroll(function () {
    if (!$("#header-search").hasClass("is-visible")) {
      if (jQuery(window).scrollTop() >= pxShow) {
        jQuery("#go-top").fadeIn(fadeInTime);
      } else {
        jQuery("#go-top").fadeOut(fadeOutTime);
      }
    }
  });
})(jQuery);
