/**
 * MASNAEY - Main JavaScript
 * jQuery 3.7.1 + Swiper 11
 */

$(function () {
  "use strict";

  /* ============================================================
     NAVBAR - Sticky + Scroll Effect
  ============================================================ */
  const $navbar = $('.navbar-masnaey');

  $(window).on('scroll.navbar', function () {
    if ($(this).scrollTop() > 10) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }
  });

  /* ============================================================
     SCROLL TO TOP
  ============================================================ */
  const $scrollBtn = $('#scrollToTop');

  $(window).on('scroll.scrolltop', function () {
    if ($(this).scrollTop() > 300) {
      $scrollBtn.addClass('visible');
    } else {
      $scrollBtn.removeClass('visible');
    }
  });

  $scrollBtn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500, 'swing');
  });

  /* ============================================================
     ANIMATE ON SCROLL (AOS - Lightweight Custom)
  ============================================================ */
  const aosObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.aos-fade-up').forEach(function (el) {
    aosObserver.observe(el);
  });

  /* ============================================================
     LAZY IMAGES
  ============================================================ */
  const lazyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          lazyObserver.unobserve(img);
        }
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img.lazy').forEach(function (img) {
    lazyObserver.observe(img);
  });

  /* ============================================================
     SWIPER - Factories
  ============================================================ */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.swiper-factories', {
      slidesPerView: 1.15,
      spaceBetween: 16,
      loop: false,
      grabCursor: true,
      dir: 'rtl',
      navigation: {
        nextEl: '.factories-next',
        prevEl: '.factories-prev',
        disabledClass: 'swiper-button-disabled',
      },
      breakpoints: {
        576: { slidesPerView: 1.5, spaceBetween: 18 },
        768: { slidesPerView: 2.2, spaceBetween: 20 },
        992: { slidesPerView: 3,   spaceBetween: 22 },
        1200:{ slidesPerView: 3,   spaceBetween: 24 },
      },
      a11y: {
        prevSlideMessage: 'الشريحة السابقة',
        nextSlideMessage: 'الشريحة التالية',
      },
    });
  }

  /* ============================================================
     HERO SEARCH FORM
  ============================================================ */
  $('#heroSearchForm').on('submit', function (e) {
    e.preventDefault();
    const query  = $('#searchInput').val().trim();
    const cat    = $('#searchCategory').val();
    const region = $('#searchRegion').val();
    if (query || cat || region) {
      // Build URL — adapt to your routing
      const params = new URLSearchParams();
      if (query)  params.set('q', query);
      if (cat)    params.set('cat', cat);
      if (region) params.set('region', region);
      window.location.href = 'search.html?' + params.toString();
    }
  });

  // Quick tags
  $(document).on('click', '.hero-tag', function () {
    const tag = $(this).text().trim();
    $('#searchInput').val(tag);
    $('#heroSearchForm').trigger('submit');
  });

  /* ============================================================
     DROPDOWN - Keyboard accessibility fix RTL
  ============================================================ */
  $('.navbar-masnaey .dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').addClass('show-animate');
  });

  /* ============================================================
     COUNTER ANIMATION (for stats if added later)
  ============================================================ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('ar-EG');
    }, 16);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ============================================================
     MOBILE NAV — close on link click
  ============================================================ */
  $('.navbar-masnaey .nav-link:not(.dropdown-toggle)').on('click', function () {
    const $collapse = $('.navbar-collapse');
    if ($collapse.hasClass('show')) {
      $('.navbar-toggler').trigger('click');
    }
  });

});
