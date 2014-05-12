
var fsDb = require("js-git/mixins/fs-db");
var fs = require("../git-node-fs");

module.exports = function (repo, path) {
  repo.rootPath = path;
  fsDb(repo, fs);
};

