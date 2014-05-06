"use strict";
var nodeFs = require("fs");
var nodePath = require("path");
var mkdirp = require("mkdirp");

// Implements the fs interface required by js-git/fs-db
var fs = module.exports = {};

fs.readFile = readFile;
fs.readChunk = readChunk;
fs.writeFile = writeFile;
fs.readDir = readDir;

// Reads all bytes for given path.
// => binary
// => undefined if file does not exist
function readFile(path, callback) {
  nodeFs.readFile(path, function (err, binary) {
    if (err) {
      if (err.code === "ENOENT") {
        callback();
      } else {
        callback(err);
      }
    } else {
      callback(null, binary);
    }
  });
}

// Reads bytes from inclusive [start, end) exclusive for given path.
// => binary
// => undefined if file does not exist
function readChunk(path, start, end, callback) {
  var stream = nodeFs.createReadStream(path, {
    start: start,
    end: end - 1
  });
  var chunks = [];
  stream.on("readable", function () {
    var chunk = stream.read();
    if (chunk === null) {
      callback(null, Buffer.concat(chunks));
    } else {
      chunks.push(chunk);
    }
  });
  stream.on("error", function (err) {
    if (err.code === "ENOENT") {
      callback();
    } else {
      callback(err);
    }
  });
}

// Writes all bytes over file at given path.
// Creates all necessary parent directories.
// => undefined
function writeFile(path, binary, callback) {
  mkdirp(nodePath.dirname(path), function (err) {
    if (err) {
      callback(err);
    } else {
      nodeFs.writeFile(path, binary, callback);
    }
  });
}

// Reads all entry names for a given path.
// All names are relative to the directory itself, not fully qualified paths.
// => array<name>
// => undefined if directory does not exist
function readDir(path, callback) {
  nodeFs.readdir(path, function (err, names) {
    if (err) {
      if (err.code === "ENOENT") {
        callback();
      } else {
        callback(err);
      }
    } else {
      callback(null, names);
    }
  });
}

