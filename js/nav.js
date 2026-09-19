(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  if (btn && nav) {
    btn.textContent = "Menu";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Menu");

    var closer = nav.querySelector(".nav-close");
    if (!closer) {
      closer = document.createElement("a");
      closer.href = "#main";
      closer.className = "nav-close";
      closer.textContent = "Close menu";
      nav.insertBefore(closer, nav.firstChild);
    }

    function setOpen(open) {
      nav.classList.toggle("is-open", !!open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = "Menu";
    }

    btn.addEventListener("click", function (event) {
      event.preventDefault();
      setOpen(btn.getAttribute("aria-expanded") !== "true");
    });
    closer.addEventListener("click", function (event) {
      event.preventDefault();
      setOpen(false);
    });
  }

  if (document.getElementById("booking-date") && !document.getElementById("fix-contact-date")) {
    var style = document.createElement("style");
    style.id = "fix-contact-date";
    style.textContent =
      '#booking-date,input[type=date]{-webkit-appearance:auto;appearance:auto;display:block;width:100%;box-sizing:border-box;min-height:48px;padding:0.65rem 0.8rem;background-color:#f3efe6 !important;color:#2e1f3d !important;-webkit-text-fill-color:#2e1f3d !important;border:1px solid #b8b2aa;border-radius:2px;font:inherit;font-size:1rem;}' +
      '#booking-date::-webkit-calendar-picker-indicator{display:block;opacity:1;cursor:pointer;width:1.1rem;height:1.1rem;}' +
      '#booking-date::-webkit-datetime-edit,#booking-date::-webkit-datetime-edit-fields-wrapper,#booking-date::-webkit-datetime-edit-text,#booking-date::-webkit-datetime-edit-month-field,#booking-date::-webkit-datetime-edit-day-field,#booking-date::-webkit-datetime-edit-year-field{color:#2e1f3d;-webkit-text-fill-color:#2e1f3d;}';
    document.head.appendChild(style);
  }
})();
