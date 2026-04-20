module.exports = {
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en", "ko", "zh", "ja"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};