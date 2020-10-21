$(document).ready(function () {
    "use strict";

    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;


    $(".fullscreen").css("height", window_height)
    $(".fitscreen").css("height", fitscreen);


    // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function (e) {
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });

    $('select').niceSelect();
    $('.img-pop-up').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    //  Counter Js 

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $(document).ready(function () {
        $('#mc_embed_signup').find('form').ajaxChimp();
    });
    // -------   Offer Send ajax

    $(document).ready(function () {
        // Add smooth scrolling to all links
        $("a").on('click', function (event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            } // End if
        });

        // Video lightbox
        $('.play-btn').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });


        //  testimonail carusel
        $('.active-bottle-carousel').owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true
        });

        // update bid limit 
        $('#offer')[0].setAttribute('min', 10000);

        var form = $('#myForm'); // contact form
        var submit = $('.submit-btn'); // submit button
        var alertMsg = $('.alert-msg'); // alert div for show alert message

        // form submit event
        form.on('submit', function (e) {
            e.preventDefault(); // prevent default form submit

            alertMsg.fadeOut();
            submit.html('Sending....'); // change submit button text

            const payload = {
                offer: document.getElementById('offer').value,
                email: document.getElementById('email').value
            };

            fetch("https://lf5lqjs78k.execute-api.eu-west-1.amazonaws.com/prod/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    // alert.html(data).fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    submit.attr("style", "display: none !important");; // reset submit button text
                    document.getElementById('offerResult').innerText = data.message;
                })
                .catch(function (err) {
                    // alert.html(err).fadeIn(); //JSON.stringify(err,  null, 4);
                    console.log(JSON.stringify(err, null, 4));
                    document.getElementById('offerResult').innerText = 'Unexpected error!';

                    form.trigger('reset'); // reset form
                    submit.attr("style", "display: none !important");; // reset submit button text
                });

        });
    });
});