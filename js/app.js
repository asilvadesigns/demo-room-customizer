var App = (function() {

  var APP = document.querySelector("#app");
  var IMG_PATH = 'img/';
  var ROOM, MENU;
  var SIDEBAR, SIDEBAR_TOGGLE;

  function Init(PRODUCTS) {
    if (!APP || !PRODUCTS) {
      return;
    }

    ROOM = APP.querySelector('#room');
    MENU = APP.querySelector('#menu');
    SIDEBAR = APP.querySelector('#sidebar');
    SIDEBAR_TOGGLE = APP.querySelectorAll('#sidebar__toggle');

    _AddEventListeners();
    _Render();
  }

  function _AddEventListeners() {
    SIDEBAR_TOGGLE.forEach( function(toggle) {
      toggle.addEventListener('click', _Toggle);
    });
  }

  function _Render() {
    var index = 0;
    for (var product in PRODUCTS) {
      if (PRODUCTS.hasOwnProperty(product)) {
        var productImage = PRODUCTS[product].image;
        var productThumb = PRODUCTS[product].thumb;
        var productType = PRODUCTS[product].type;
        var productActive = PRODUCTS[product].active;
      }

      var ROOM_ITEM = document.createElement('DIV');
      ROOM_ITEM.setAttribute('class', 'item');
      if (productActive) {
        ROOM_ITEM.setAttribute('class', 'item active');
      }
      ROOM_ITEM.setAttribute('style', 'background-image: url(' + IMG_PATH + productImage + ');');
      ROOM_ITEM.setAttribute('data-type', productType);
      ROOM_ITEM.setAttribute('data-index', index);
      ROOM.append(ROOM_ITEM);

      var MENU_ITEM = document.createElement('BUTTON');
      MENU_ITEM.innerHTML = product;
      MENU_ITEM.setAttribute('class', 'menu-item');
      if (productActive) {
        MENU_ITEM.setAttribute('class', 'menu-item active');
      }
      MENU_ITEM.setAttribute('style', 'background-image: url(' + IMG_PATH + productThumb + ');');
      MENU_ITEM.setAttribute('onclick', 'App.toggle(this)');
      MENU_ITEM.setAttribute('data-type', productType);
      MENU_ITEM.setAttribute('data-index', index);
      MENU.append(MENU_ITEM);

      index++;
    }
  }

  function _Toggle(evt) {
    SIDEBAR.classList.toggle('active');
  }

  function ToggleActive(el) {
    var index = el.getAttribute("data-index");
    var dtype = el.getAttribute("data-type");
    var layer = ROOM.querySelector("[data-index='" + index + "']");

    _DisableAllOfType(dtype, ROOM);
    layer.classList.toggle("active");

    _DisableAllOfType(dtype, MENU);
    el.classList.toggle("active");
  }

  function _DisableAllOfType(type, parent) {
    var els = parent.querySelectorAll("[data-type='" + type + "']");
    els.forEach(function(item) {
      item.classList.remove("active");
    });
  }

  return {
    init: Init,
    toggle: ToggleActive
  };

})();
App.init(PRODUCTS);
