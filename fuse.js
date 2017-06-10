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

fuse.dev();
fuse
  .bundle("app")
  .watch().hmr()
  .instructions("> index.tsx")

fuse.run();
