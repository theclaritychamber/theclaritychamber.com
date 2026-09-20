(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  if (btn && nav) {
    btn.textContent = "Menu";
    btn.setAttribute("aria-expanded", "false");
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

  function addSheet(href, test) {
    if (!document.querySelector(test)) return;
    if (document.querySelector('link[href*="' + href.split("/").pop() + '"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
  addSheet("css/fix-cards.css", ".suits");
  addSheet("css/fix-about.css", ".meet-loveleen");
  addSheet("css/fix-hiw.css", ".hiw-page");

  var date = document.getElementById("booking-date");
  if (!date) return;
  var old = document.getElementById("fix-contact-date");
  if (old) old.remove();
  var style = document.createElement("style");
  style.id = "fix-contact-date";
  style.textContent =
    ".live-fields{display:grid !important;grid-template-columns:1fr !important;gap:0.9rem !important;}" +
    ".live-fields>p{grid-column:1/-1 !important;width:100% !important;min-width:0 !important;margin:0 !important;overflow:hidden;}" +
    ".live-fields select,.live-fields input,#booking-date,#platform,#booking-time{display:block !important;width:100% !important;max-width:100% !important;height:48px !important;min-height:48px !important;max-height:48px !important;box-sizing:border-box !important;padding:0 0.9rem !important;background:#f3efe6 !important;color:#2e1f3d !important;border:1px solid #b8b2aa !important;border-radius:2px !important;}" +
    "#booking-date{-webkit-appearance:none !important;appearance:none !important;}";
  document.head.appendChild(style);
})();
