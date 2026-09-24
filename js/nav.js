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
    var ig = '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f58529"/><stop offset="0.5" stop-color="#dd2a7b"/><stop offset="1" stop-color="#8134af"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.15" fill="#fff"/></svg>';
    var yt = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="5" width="22" height="14" rx="4" fill="#FF0000"/><path fill="#fff" d="M10 9.2v5.6l5.2-2.8z"/></svg>';
    var tt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25F4EE" d="M14.4 3.2h2.5c.25 1.7 1.2 3.15 2.7 4.05 1 .6 2.15.9 3.35.95v2.55c-1.55-.05-3-.5-4.2-1.25v6.85A6.85 6.85 0 1 1 10.2 9.6v2.7a4.2 4.2 0 1 0 2.95 4V3.2z" transform="translate(0.7 0.7)"/><path fill="#FE2C55" d="M14.4 3.2h2.5c.25 1.7 1.2 3.15 2.7 4.05 1 .6 2.15.9 3.35.95v2.55c-1.55-.05-3-.5-4.2-1.25v6.85A6.85 6.85 0 1 1 10.2 9.6v2.7a4.2 4.2 0 1 0 2.95 4V3.2z" transform="translate(-0.7 -0.7)"/><path fill="#fff" d="M14.4 3.2h2.5c.25 1.7 1.2 3.15 2.7 4.05 1 .6 2.15.9 3.35.95v2.55c-1.55-.05-3-.5-4.2-1.25v6.85A6.85 6.85 0 1 1 10.2 9.6v2.7a4.2 4.2 0 1 0 2.95 4V3.2z"/></svg>';
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
