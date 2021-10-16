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
}
