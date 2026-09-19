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
      ".live-fields{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);gap:0.85rem 1.1rem;align-items:end;}" +
      ".live-fields p{min-width:0;width:100%;margin:0;}" +
      ".live-fields select,.live-fields input[type=date],#booking-date{display:block;width:100%;height:48px;min-height:48px;max-height:48px;box-sizing:border-box;padding:0 0.9rem;background-color:#f3efe6 !important;color:#2e1f3d !important;border:1px solid #b8b2aa;border-radius:2px;font-size:1rem;}" +
      "#booking-date{-webkit-appearance:auto;appearance:auto;padding:0 0.7rem;}" +
      "@media (max-width:900px){.live-fields{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}.live-fields p:first-child{grid-column:1/-1;}}";
    document.head.appendChild(style);
  }
})();
