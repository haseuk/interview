window.onload = function() {
  if ('classList' in document.createElement('_')) {
    !(function() {
      'use strict';
      var c1 = 'c1';
      var c2 = 'c2';
      var testElement = document.createElement('_');
      testElement.classList.add(c1, c2);
      if (!testElement.classList.contains(c2)) {
        var createMethod = function(method) {
          var _method = DOMTokenList.prototype[method];
          DOMTokenList.prototype[method] = function(token) {
            for (var i = -1, len = arguments.length; ++i < len;) {
              token = arguments[i];
              _method.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }
      testElement.classList.toggle(c1, true);
      if (!testElement.classList.contains(c1)) {
        var _toggle = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          }
          return _toggle.call(this, token);
        };
      }
      testElement = null;
    }());
  } else {
    ('Element' in view) && (function(view) {
      'use strict';
      var proto = 'prototype';
      var arrIndexOf = Array[proto].indexOf;
      var DOMEx = function(type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
      };
      DOMEx[proto] = Error[proto];
      var checkTokenAndGetIndex = function(classList, token) {
        if (token === '') {
          throw new DOMEx('SYNTAX_ERR',
            'An invalid or illegal string was specified');
        }
        if (/\s/.test(token)) {
          throw new DOMEx('INVALID_CHARACTER_ERR',
            'String contains an invalid character');
        }
        return arrIndexOf.call(classList, token);
      };
      var ClassList = function(elem) {
        var classes = (elem.getAttribute('class') || '').trim();
        if (classes) {
          var classlist = classes.split(/\s+/);
          for (var i = -1, len = classlist.length; ++i < len;) {
            this.push(classlist[i]);
          }
        }
        this._updateClassName = function() {
          elem.setAttribute('class', this.toString());
        };
      };
      var classListPrototype = ClassList[proto] = [];
      classListPrototype.item = function(i) {
        return this[i] || null;
      };
      classListPrototype.add = function() {
        var tokens = arguments;
        var updated = false;
        for (var i = -1, len = tokens.length; ++i < len;) {
          var token = tokens[i] + '';
          if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
          }
        }
        if (updated) { this._updateClassName(); }
      };
      classListPrototype.remove = function() {
        var tokens = arguments;
        var updated = false;
        var index;
        for (var i = -1, len = tokens.length; ++i < len;) {
          var token = tokens[i] + '';
          while ((index = checkTokenAndGetIndex(this, token)) !== -1) {
            this.splice(index, 1);
            updated = true;
          }
        }
        if (updated) { this._updateClassName(); }
      };
      classListPrototype.toggle = function(token, force) {
        token += '';  // ensure that is string
        if (this.contains(token)) {
          return (force === true) || (this.remove(token), false);
        }
        return (force === false) ? false : (this.add(token), true);
      };
      classListPrototype.toString = function() {
        return this.join(' ');
      };
      classListPrototype.contains = function(token) {
        return checkTokenAndGetIndex(this, token + '') !== -1;
      };
      var classListGetter = function() {
        return new ClassList(this);
      };
      Object.defineProperty(view.Element[proto], 'classList', {
        get: classListGetter,
        enumerable: true,
        configurable: true
      });
    }(self));
  }

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
  topBanX.addEventListener('click', function() {
    topBanner.classList.remove('on');
  })
}
