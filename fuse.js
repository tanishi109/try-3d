const {FuseBox} = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src/",
  sourcemaps: true,
  output: "dist/$name.js",
});

fuse.dev();
fuse
  .bundle("app")
  .watch().hmr()
  .instructions("> index.tsx")

fuse.run();
