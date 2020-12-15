module.exports = (config) => {
  config.addPassthroughCopy("src/assets/");

  config.setLibrary(
    "md",
    require("markdown-it")({ html: true }).disable("code")
  );
  
  config.addPlugin(require("eleventy-plugin-emoji"));

  return {
    dir: {
      input: "src/",
      output: "docs/",
    },
    // To host under a GitHub pages subdomain, uncomment
    // the following line and update the repo name:
    // pathPrefix: "/github-repo-name/",
  };
};
