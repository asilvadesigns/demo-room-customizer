//
//  TODO: Read images from json data file or something and render from there.
//
var App = (function() {
  var APP = document.querySelector("#app");
  var ROOM, SIDEBAR, ITEMS;

  function Init() {
    if (!APP) {
      return;
    }

    ROOM = APP.querySelector("#room");
    SIDEBAR = APP.querySelector("#sidebar");
    ITEMS = APP.querySelectorAll(".menu-item");

    _SetDefaults();
  }

  function _SetDefaults() {
    ITEMS.forEach(function(item) {
      //  get classname
      var classNameRaw = item.getAttribute("style");
      var className = classNameRaw.slice(
        classNameRaw.indexOf("/") + 1,
        classNameRaw.indexOf(".")
      );
      //  make new sidebar button
      var newNode = document.createElement("BUTTON");
      newNode.classList.add(className);
      newNode.setAttribute("onclick", "App.toggle(this)");
      //  newNode.setAttribute("style", classNameRaw);
      newNode.setAttribute("data-type", item.getAttribute("data-type"));
      newNode.innerHTML = className;
      SIDEBAR.appendChild(newNode);
    });
  }

  function ToggleType(el) {
    var className = el.getAttribute("class");
    var dataType = el.getAttribute('data-type')
    var toggleEl = ROOM.querySelector(".item[style*=" + className + "]");
    //  toggle - first disable all of current type, then enable current
    _DisableAllOfType(dataType, ROOM);
    toggleEl.classList.toggle("active");
    //  toggle - switch the current button on/off
    _DisableAllOfType(dataType, SIDEBAR);
    el.classList.toggle("active");
  }

  function _DisableAllOfType(type, parent) {
    var els = parent.querySelectorAll("[data-type=" + type + "]");
    els.forEach(function(item) {
      item.classList.remove("active");
    });
  }

  return {
    init: Init,
    toggle: ToggleType
  };
})();
App.init();
