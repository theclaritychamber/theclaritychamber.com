(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.querySelector("header nav");
  var root = (location.pathname.indexOf("/blog/") === 0) ? "../" : "";

  function addSheet(href) {
    var file = href.split("/").pop();
    if (document.querySelector('link[href*="' + file + '"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = root + href;
    document.head.appendChild(link);
  }
  addSheet("css/patches.css");

  if (document.getElementById("booking-form")) {
    var validate = document.createElement("script");
    validate.src = root + "js/fix-booking.js";
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

  var footer = document.querySelector("footer");
  if (footer) {
    var existing = footer.querySelector(".footer-social");
    if (existing) existing.remove();
    var ig = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>';
    var yt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5.1 12 5.1 12 5.1s-6.9 0-8.5.4A3 3 0 0 0 1.4 7.6C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5V8.9l6.4 3.3z"/></svg>';
    var tt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.2 3h2.6c.3 2.3 1.7 4.1 4 4.7v2.6c-1.4 0-2.7-.4-3.9-1.1v6.7A6.9 6.9 0 1 1 10 9.1v2.8a4.2 4.2 0 1 0 3 4v-12z"/></svg>';
    var social = document.createElement("p");
    social.className = "footer-social";
    social.innerHTML =
      '<a class="social-icon" href="https://www.instagram.com/theclaritychamber" rel="noopener noreferrer" target="_blank" aria-label="Instagram">' + ig + '</a>' +
      '<a class="social-icon" href="https://www.youtube.com/@theclaritychamber.official" rel="noopener noreferrer" target="_blank" aria-label="YouTube">' + yt + '</a>' +
      '<a class="social-icon" href="https://www.tiktok.com/@theclaritychamber" rel="noopener noreferrer" target="_blank" aria-label="TikTok">' + tt + '</a>';
    var contact = footer.querySelector(".footer-contact");
    if (contact && contact.nextSibling) footer.insertBefore(social, contact.nextSibling);
    else footer.appendChild(social);
  }
})();
