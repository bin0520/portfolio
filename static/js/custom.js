jQuery(document).ready(function ($) {
    "use strict";
    fc_ScrollAction();
    fc_CardNumber();
    fc_Counter();
    fc_Cursor();
    fc_SwiperSlider_CustomData();
    fc_Aos();
    fc_Typed();
    fc_DarkMode();
    function fc_DarkMode() {
        var body = $('body');
        $('.js-settings').on('click', function (even) {
            $(this).parent().parent().toggleClass('active');
        });
    }

    var b = document.getElementsByTagName("body")[0];

    b.addEventListener("mousemove", function (event) {
        fc_ParrallaxImages(event);

    });

    function fc_Typed() {
        var typedElement = document.getElementById('typed');
        if (typedElement) {
            var typed = new Typed('#typed', {
                stringsElement: '#typed-strings',
                typeSpeed: 40,
                delaySpeed: 90,
                loop: true
            });
        }
    }

    function fc_Aos() {
        AOS.init({
            easing: 'ease',
            duration: 1000,
            once: true
        });
    }

    function fc_ParrallaxImages(e) {
        var movedX = (e.clientX * -0.3 / 8);
        var movedY = (e.clientY * -0.3 / 8);
        var x = document.getElementsByClassName('js-parallaxed');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.transform = 'translate(' + movedX + 'px,' + movedY + 'px)'
        }
    }

    function fc_Cursor() {
        $(document).on('mousemove', (event) => {
            $('.cursor').css({
                left: event.clientX,
                top: event.clientY,
            });
        });
        $('a,button,.hamburger-menu,.cs-swiper-button').mouseover(function () {
            $('.cursor').addClass('active');
        }).mouseout(function () {
            $('.cursor').removeClass('active');
        });
    }

    function fc_ScrollAction() {

        $(window).on('scroll', function () {
            if ($(document).scrollTop() > 1000) {
                $('.js-back-to-top').addClass('active');
            } else {
                $('.js-back-to-top').removeClass('active');
            }
        });

    }

    setInterval(function () {
        fc_countdown();
    }, 1000);

    function fc_Counter() {
        $('.js-count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: $(this).data('duration'),
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    function fc_countdown() {
        $('.js-time').each(function () {
            var endTime = new Date($(this).data('time'));
            endTime = (Date.parse(endTime) / 1000);

            var now = new Date();
            now = (Date.parse(now) / 1000);

            var timeLeft = endTime - now;

            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

            if (hours < "10") {
                hours = "0" + hours;
            }
            if (minutes < "10") {
                minutes = "0" + minutes;
            }
            if (seconds < "10") {
                seconds = "0" + seconds;
            }

            $(this).find('.days').html(days + "<span class='fs-xs letter-spacing-2 text-uppercase mt-1'>Days</span>");
            $(this).find('.hours').html(hours + "<span class='fs-xs letter-spacing-2 text-uppercase mt-1'>Hrs</span>");
            $(this).find('.minutes').html(minutes + "<span class='fs-xs letter-spacing-2 text-uppercase mt-1'>Mins</span>");
            $(this).find('.seconds').html(seconds + "<span class='fs-xs letter-spacing-2 text-uppercase mt-1'>Secs</span>");
        });
    }

    function fc_SwiperSlider_CustomData() {
        var sliderSelector = '.hero-slider .swiper-container',
            dataDefault = {};

        var eachSlider = document.querySelectorAll(sliderSelector);

        [].forEach.call(eachSlider, function (slider, index, arr) {
            var data = slider.getAttribute('data-slide') || {};
            if (data) {
                var dataOptions = JSON.parse(data);
                var thumbsOptions = dataOptions.thumb;
                var thumbsInit;
                if (thumbsOptions) {

                    var thumbImages = slider.querySelectorAll("img");
                    var slides = '';
                    thumbImages.forEach(function (img) {
                        slides += "\n          <div class='swiper-slide '>\n            <img class='img-fluid' src=".concat(img.src, " alt='img'/>\n          </div>\n        ");
                    });
                    var thumbs = document.createElement('div');
                    thumbs.setAttribute('class', 'swiper js-thumb');
                    thumbs.innerHTML = "<div class='swiper-wrapper'>".concat(slides, "</div>");
                    if (thumbsOptions.parent) {
                        var parent = document.querySelector(thumbsOptions.parent);
                        parent.parentNode.appendChild(thumbs);
                    } else {
                        slider.parentNode.appendChild(thumbs);
                    }
                    thumbsOptions.options = Object.assign(
                        {
                            navigation: {
                                nextEl: thumbs.querySelector(".cs-swiper-button-next"),
                                prevEl: thumbs.querySelector(".cs-swiper-button-prev"),
                            },
                        }, thumbs, thumbsOptions);

                    thumbsInit = new window.Swiper(thumbs, thumbsOptions.options);

                    slider.options = Object.assign(
                        {
                            thumbs: {
                                swiper: thumbsInit
                            },
                        }, dataDefault, dataOptions);

                    var swiper = new Swiper(slider, slider.options);
                } else {
                    slider.options = Object.assign({}, dataDefault, dataOptions);

                    var swiper = new Swiper(slider, slider.options);

                }
            }
        });
    }

    function fc_CardNumber() {
        $('.credit-card').each(function () {
            var card = new Card({
                form: '.credit-card',
                container: '.card-wrapper',

                messages: {
                    validDate: 'expire\ndate',
                    monthYear: 'mm/yy'
                }
            });
        });

    }

});
