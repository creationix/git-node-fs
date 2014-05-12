git-node-fs
===========

A node adapter for the fs-db mixin for [js-git].
This enables access to Git repositories on the filesystem using Node.js.

```js
var repo = {};
repo.rootPath = path.join(__dirname, ".git");
require("git-node-fs/mixins/bare-db")(repo);
```

Or use the provided mixin directly.

```js
var repo = {};
var path = path.join("some/bare/repo.git");
require('git-node-fs/mixins/fs-db')(repo, path);
```

[js-git]: https://github.com/creationix/js-git

