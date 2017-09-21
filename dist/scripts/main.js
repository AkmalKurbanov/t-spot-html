'use strict';

$(function () {

  $('.js-phone').mask('+7 (999) 999-99-99');

  $(".footer__form").submit(function () {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }).done(function () {
      $.magnificPopup.open({
        items: {
          src: '#submite',
          type: 'inline'
        },
        midClick: true,
        closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>'
      });
    });
    return false;
  });

  $(".questions__form-js").submit(function () {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize()
    }).done(function () {
      $.magnificPopup.open({
        items: {
          src: '#thank',
          type: 'inline'
        },
        midClick: true,
        closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>'
      });
    });
    return false;
  });

  var owl = $('.main-slider-js');
  owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    mouseDrag: false
  });
  $('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [5000]);
  });
  $('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay');
  });

  $('.js-btn').on('click', function (event) {
    event.preventDefault();
    $('.-hide_blog').slideToggle();
    $(this).hide();
  });

  $('.collapse.in').prev('.panel-heading').addClass('');
  $('#accordion, #bs-collapse').on('show.bs.collapse', function (a) {
    $(a.target).prev('.panel-heading').addClass('active');
  }).on('hide.bs.collapse', function (a) {
    $(a.target).prev('.panel-heading').removeClass('active');
  });

  $('.group_radio_goods').each(function (index, el) {
    $(this).children('.group_radio').addClass('cat' + index);
    console.log('cat' + index);
  });

  $('.header__nav ul').clone().appendTo('.mmenu-nav');

  var $menu = $('.mmenu-nav').mmenu({
    navbar: {
      title: 'Меню'
    },
    extensions: ['fx-menu-slide', 'fx-listitems-slide', 'border-full', 'pagedim-black'],
    offCanvas: {
      'position': 'right'
    },
    counters: true
  });

  var $icon = $('.js-navtrigger');
  var API = $menu.data('mmenu');

  $icon.on('click', function () {
    API.open();
  });

  API.bind('open:start', function ($panel) {
    $('.js-navtrigger').toggleClass('-active');
  });

  API.bind('close:start', function ($panel) {
    $('.js-navtrigger').toggleClass('-active');
  });

  if (Modernizr.mq('(max-width: 767px)')) {
    var init = function init(data) {
      $('#map').html('');
      myMap = new ymaps.Map('map', {
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
        center: [],
        behaviors: ['drag'],
        zoom: 17
      });

      if (!data.type) {
        myPlacemark = new ymaps.Placemark([], {
          balloonContentHeader: '',
          balloonContentBody: ''

        });
        myMap.geoObjects.add(myPlacemark);
        return true;
      };
    };

    $('a.-pagescroll[href*="#"]:not([href="#"])').click(function () {
      API.close();
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return true;
        }
      }
    });

    var myMap, myPlacemark;

    ymaps.ready(init);

    ;
  } else {
    var _init = function _init(data) {
      $('#map').html('');
      myMap = new ymaps.Map('map', {
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
        center: [],
        behaviors: ['drag'],
        zoom: 17
      });

      if (!data.type) {
        myPlacemark = new ymaps.Placemark([], {
          balloonContentHeader: '',
          balloonContentBody: ''
        });
        myMap.geoObjects.add(myPlacemark);
        return true;
      };
    };

    $('a.-pagescroll[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return true;
        }
      }
    });
    var myMap, myPlacemark;

    ymaps.ready(_init);

    ;
  }

  // Form validation
  var validate = {

    form: function form(_form) {

      var status = true;
      var elems = $(_form).find("*[data-validate]");
      var t = this;

      for (var i = 0; i < elems.length; i++) {

        if (t.inp(elems[i]) == false) status = false;
      }

      return status;
    },

    inp: function inp(input) {

      if ($(input).attr("data-validate") == 'none') return true;

      switch ($(input).attr("data-validate")) {

        case 'phone':

          var reg = new RegExp('^[\-\+\ \(\)0-9]{10,20}$');
          break;

        case 'number':

          var reg = new RegExp('^[0-9]{1,}$');
          break;

        case 'captcha':

          var reg = new RegExp('^[0-9]{6}$');
          break;

        case 'email':

          var reg = new RegExp('^[\-\.\_a-zA-Z0-9]+@([-\.a-z0-9]+)+\.[a-z]{2,6}$');
          break;

        case 'checkbox':

          var reg = new RegExp('^1$');
          break;

        case 'password':

          var reg = new RegExp('^[0-9a-zA-Z]{6,20}$');
          break;

        case 'inn':

          var reg = new RegExp('^[0-9]{10,12}$');
          break;

        case 'kpp':

          var reg = new RegExp('^[0-9]{9}$');
          break;

        default:

          var reg = new RegExp('[a-zA-Zа-яА-Я0-9]{3,}');
          break;
      }

      switch (input.tagName) {

        case 'TEXTAREA':

          var value = input.value;
          break;

        case 'SELECT':

          var value = $(input).find('option:selected').attr('value');
          break;

        case 'INPUT':

          switch ($(input).attr('type')) {

            case 'checkbox':

              var value = input.checked ? input.value : 0;
              break;

            default:

              var value = input.value;
              break;
          }
          break;
      }

      var status = reg.test(value) && value != $(input).attr('default');

      if (status === true) {
        $(input).removeClass("error");
        $(input).parent().find('span.customSelect').removeClass("error");
        $(input).parent().find('input.form-control').removeClass("error");
      } else {
        $(input).addClass("error");
        $(input).parent().find('span.customSelect').addClass("error");
        $(input).parent().find('input.form-control').addClass("error");
      }
      return status;
    }
  };
});