(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  if (!btn || !nav) return;

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
})();
