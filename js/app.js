(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("navLinks");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

(function () {
  var targets = document.querySelectorAll(".reveal");
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    targets.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach(function (el) {
    observer.observe(el);
  });
})();

(function () {
  var buttons = document.querySelectorAll(".serve-btn");
  var interestSelect = document.getElementById("sfInterest");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var interest = btn.getAttribute("data-interest");
      if (interestSelect && interest) interestSelect.value = interest;
      var connect = document.getElementById("connect");
      if (connect) connect.scrollIntoView({ behavior: "smooth" });
      var nameField = document.getElementById("sfName");
      if (nameField) window.setTimeout(function () { nameField.focus(); }, 400);
    });
  });

  var form = document.getElementById("serveForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var interest = form.interest.value;
    var message = form.message.value.trim();
    var lines = [
      "Name: " + name,
      "Email: " + email,
      "Interested in: " + (interest || "—"),
      "Message: " + (message || "—")
    ];
    var subject = "The River U.P. — Sign Up: " + name;
    var body = lines.join("\n");
    var mailto =
      "mailto:jonmpotes.33@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    window.location.href = mailto;
  });
})();
