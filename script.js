(function () {
  "use strict";

  var storageKey = "looptool-language";
  var language = "en";

  try {
    var savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === "en" || savedLanguage === "zh") language = savedLanguage;
  } catch (error) {
    // The site still works in browsers that block local storage.
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage === "zh" ? "zh" : "en";
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-en][data-zh]").forEach(function (element) {
      element.innerHTML = element.getAttribute("data-" + language);
    });

    var title = document.querySelector("title[data-en][data-zh]");
    if (title) document.title = title.getAttribute("data-" + language);

    var description = document.querySelector("meta[name='description'][data-en][data-zh]");
    if (description) description.setAttribute("content", description.getAttribute("data-" + language));

    var toggle = document.getElementById("language-toggle");
    if (toggle) {
      toggle.textContent = language === "en" ? "中文" : "EN";
      toggle.setAttribute("aria-label", language === "en" ? "切换为中文" : "Switch to English");
    }

    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // Ignore storage failures and keep the current page translated.
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(language);

    var toggle = document.getElementById("language-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLanguage(language === "en" ? "zh" : "en");
      });
    }
  });
})();
