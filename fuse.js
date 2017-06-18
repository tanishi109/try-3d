const {FuseBox, WebIndexPlugin} = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src/",
  sourcemaps: true,
  plugins: [
    WebIndexPlugin({
      template: "src/index.html",
    }),
  ],
  output: "dist/$name.js",
});

const path = require("path");
const express = require("express");

fuse.dev({ root: false }, server => {
  const dist = path.resolve("./dist");
  const app = server.httpServer.app;

  app.use("/static/", express.static(path.join(dist, "static")));

  app.get("/app.js", function(req, res) {
    res.sendFile(path.join(dist, "app.js"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(dist, "index.html"));
  });
});

fuse
  .bundle("app")
  .watch()
  .instructions("> index.tsx")

fuse.run();
