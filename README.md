git-node-fs
===========

A node adapter for the fs-db mixin for [js-git].
This enables access to Git repositories on the filesystem using Node.js.

```js
var repo = {};
repo.rootPath = path.join(__dirname, ".git");
var fs = require("git-node-fs");
require("js-git/mixins/fs-db")(repo, fs);
```

[js-git]: https://github.com/creationix/js-git

