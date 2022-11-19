"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    if (req.body.locale === undefined || req.body.text === undefined) {
      return res.json({ error: "Required field(s) missing" });
    }
    if (!req.body.text) {
      return res.json({ error: "No text to translate" });
    }
    const locale = req.body.locale;
    if (locale === "american-to-british" || locale === "british-to-american") {
      return res.json({
        translation: translator.translate(req.body.text, locale, true),
        text: req.body.text,
      });
    } else {
      return res.json({ error: "Invalid value for locale field" });
    }
  });
};
