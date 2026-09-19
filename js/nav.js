(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  if (!btn || !nav) return;

  btn.innerHTML =
    '<span class="nav-label-menu">Menu</span>' +
    '<span class="nav-label-close">Close menu</span>';

  function render(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.classList.toggle("is-open", open);
  }

  render(false);
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    render(btn.getAttribute("aria-expanded") !== "true");
  });
})();
