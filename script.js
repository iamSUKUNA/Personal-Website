const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
});

function animation() {
  var tl = gsap.timeline();
  tl.from('#nav', {
    y: '-10',
    opacity: 0,
    duration: 1.1,
    ease: Expo.easeInOut,
  })
    .to('.animatingElem', {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
    })
    .to('.h1Tag', {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
    })
    .to('.h5Tag', {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
    })
    .to('.animatingElem2', {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1,
      duration: 1,
    })
    .from('#footer', {
      y: '-10',
      opacity: 0,
      delay: -0.4,
      duration: 1,
      ease: Expo.easeInOut,
    });
}
// mouse cursor skewness
function skewCursor() {
  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;
  window.addEventListener('mousemove', function (det) {
    //----------------
    xScale = gsap.utils.clamp(0.8, 1.2, det.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, det.clientY - yPrev);
    xPrev = det.clientX;
    yPrev = det.clientY;
    //----------------
    if (det.clientX - xPrev && det.clientY - yPrev === 0) {
      document.querySelector('#cursorCircle').style.transform = `translate(${
        det.clientX
      }px, ${det.clientY}px) scale(${1}, ${1})`;
    } else {
      circle(xScale, yScale);
    }
    //----------------
  });
}

function circle(xScale, yScale) {
  window.addEventListener('mousemove', function (det) {
    document.querySelector(
      '#cursorCircle'
    ).style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(${xScale}, ${yScale})`;
  });
}
circle();
animation();
skewCursor();

document.querySelectorAll('.elem').forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener('mouseleave', function (det) {
    gsap.to(elem.querySelector('img'), {
      opacity: 0,
      ease: Power4,
      duration: 0.5,
    });
  });

  elem.addEventListener('mousemove', function (det) {
    var diff = det.clientY - elem.getBoundingClientRect().top;
    diffrot = det.clientX - rotate;
    rotate = det.clientX;
    gsap.to(elem.querySelector('img'), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: det.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
