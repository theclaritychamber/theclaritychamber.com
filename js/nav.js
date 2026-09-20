(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");

  function addSheet(href) {
    if (document.querySelector('link[href*="' + href.split("/").pop() + '"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
  addSheet("css/patches.css");

  if (document.getElementById("booking-form")) {
    var validate = document.createElement("script");
    validate.src = "js/fix-booking.js";
    document.body.appendChild(validate);
  }

  if (btn && nav) {
    btn.textContent = "Menu";
    btn.setAttribute("aria-expanded", "false");
    function mobile() {
      return window.matchMedia("(max-width: 900px)").matches;
    }
    var closer = nav.querySelector(".nav-close");
    if (!closer) {
      closer = document.createElement("a");
      closer.href = "#main";
      closer.className = "nav-close";
      closer.textContent = "Close menu";
      nav.insertBefore(closer, nav.firstChild);
    }
    function setOpen(open) {
      if (!mobile()) open = false;
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
    window.addEventListener("resize", function () {
      if (!mobile()) setOpen(false);
    });
    if (!mobile()) setOpen(false);
  }

  var pay = document.getElementById("success-pay");
  if (pay) {
    var sent = false;
    function goStripe() {
      var href = pay.getAttribute("href") || "";
      if (sent || href.indexOf("book.stripe.com") === -1) return;
      sent = true;
      pay.style.display = "none";
      var nextLine = document.getElementById("success-next");
      if (nextLine) nextLine.textContent = "Taking you to secure payment.";
      window.setTimeout(function () {
        window.location.assign(href);
      }, 2500);
    }
    var obs = new MutationObserver(goStripe);
    obs.observe(pay, { attributes: true, attributeFilter: ["href", "style"] });
  }
})();
