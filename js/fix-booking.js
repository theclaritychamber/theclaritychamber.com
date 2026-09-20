(function () {
  var form = document.getElementById("booking-form");
  if (!form) return;
  form.setAttribute("novalidate", "");

  var status = document.getElementById("form-status");

  function valueOf(id) {
    var el = document.getElementById(id);
    if (!el) return "";
    if (el.type === "checkbox") return el.checked ? "yes" : "";
    return (el.value || "").trim();
  }

  function mark(el, bad) {
    if (!el) return;
    el.classList.toggle("is-invalid", !!bad);
    el.setAttribute("aria-invalid", bad ? "true" : "false");
  }

  function need(missing, id, label) {
    var el = document.getElementById(id);
    var empty = !valueOf(id);
    mark(el, empty);
    if (empty) missing.push(label);
  }

  form.addEventListener(
    "submit",
    function (event) {
      var missing = [];
      need(missing, "reading-type", "format");
      need(missing, "reading-option", "package");

      var type = valueOf("reading-type");
      if (type === "live") {
        need(missing, "platform", "video platform");
        need(missing, "booking-date", "preferred date");
        need(missing, "booking-time", "preferred time");
      }

      var questions = document.getElementById("recorded-questions-container");
      if (questions && questions.style.display !== "none") {
        var boxes = questions.querySelectorAll("textarea, input[type='text']");
        boxes.forEach(function (box, index) {
          var empty = !(box.value || "").trim();
          mark(box, empty);
          if (empty) missing.push("question " + (index + 1));
        });
      }

      need(missing, "first-name", "first name");
      need(missing, "last-name", "last name");
      need(missing, "email", "email");
      need(missing, "consent", "consent");

      if (!missing.length) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      var submitBtn = document.getElementById("submit-btn");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Continue to payment";
      }
      if (status) {
        status.style.display = "block";
        status.style.color = "#8a2a2a";
        status.textContent =
          missing.length === 1
            ? "Please add your " + missing[0] + " before continuing."
            : "Please complete these fields: " + missing.join(", ") + ".";
      }
      var first = form.querySelector(".is-invalid");
      if (first && first.focus) first.focus();
      if (status && status.scrollIntoView) {
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    true
  );
})();
