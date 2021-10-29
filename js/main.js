window.onload = function() {
  let mList = document.querySelectorAll('nav .m-list');
  let navList = document.querySelector('.nav-list');
  let logBox = document.querySelector('.log-box');
  let logOut = document.querySelector('.logout img');
  let header = document.querySelector('header');
  let myPage = document.querySelector('.my-page');
  let dim = document.querySelector('.dim');

  Array.prototype.forEach.call(mList, function(e) {
    e.addEventListener('mouseover', navOpen);
  });
  navList.addEventListener('mouseover', navOpen);
  navList.addEventListener('mouseout', navClose);
  logBox.addEventListener('mouseover', navClose);
  logOut.addEventListener('mouseover', headerOn);
  myPage.addEventListener('mouseover',  headerOn);
  logOut.addEventListener('mouseout', headerOff);
  myPage.addEventListener('mouseout', headerOff);

  function navOpen() {
    navList.classList.add('on');
    dimOn();
  }
  function navClose() {
    navList.classList.remove('on');
    dimOff();
  }
  function headerOn() {
    header.classList.add('on');
  }
  function headerOff() {
    header.classList.remove('on');
  }
  function dimOn() {
    dim.classList.add('on');
  }
  function dimOff() {
    dim.classList.remove('on');
  }

  let view = document.querySelector('.sec-inner2');
  let tabs = document.querySelectorAll('.tabs a');
  Array.prototype.forEach.call(tabs, function (e) {
    e.addEventListener('click', function() {
      let idx = e.getAttribute('data-page');
      view.setAttribute('data-view', idx);
    })
  });

  let topBanner = document.querySelector('.top-banner');
  let topBanX = document.querySelector('.t-ban-close');
  if(topBanX) {
    topBanX.addEventListener('click', function() {
      topBanner.classList.remove('on');
    });
  }

  let select = document.querySelector('.select');
  let labels = document.querySelectorAll('.s-label');

  labels.forEach(function(lb) {
    lb.addEventListener('click', () => {
      let optList = lb.nextElementSibling;
      let optItems = optList.querySelectorAll('.item');
      clickLabel(lb, optItems);
    })
  });
  let clickLabel = (lb, optItems) => {
    if(lb.parentNode.classList.contains('on')) {
      lb.parentNode.classList.remove('on');
      optItems.forEach((opt) => {
        opt.removeEventListener('click', () => {
          handleSelect(lb, opt)
        })
      })
    } else {
      lb.parentNode.classList.add('on');
      optItems.forEach((opt) => {
        opt.addEventListener('click', () => {
          handleSelect(lb, opt)
        })
      })
    }
  }
  let handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    label.parentNode.classList.remove('on');
  }
}
