(function(){
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function(){
    var open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Close menu" : "Menu";
  });
})();
