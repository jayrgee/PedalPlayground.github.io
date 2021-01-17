'use strict';

const fs = require('fs');
const path = require('path');

const getFileName = (x) =>
  x
    .toLowerCase()
    .replace(/[.']/g, '')
    .replace(/[^a-z\d]+/g, '-');

const createJsonForBrand = (items, brand, directory) => {
  const filePath = path.resolve(directory, `${getFileName(brand)}.json`);
  // console.log(filePath);

  const p = items
    .filter((item) => item.Brand.toLowerCase() === brand.toLowerCase())
    .sort((a, b) => (a.Name > b.Name ? 1 : b.Name > a.Name ? -1 : 0));
  const data = JSON.stringify(p, null, 2);

  fs.writeFileSync(filePath, data);
};

const deleteJson = (directory) => {
  fs.readdirSync(directory).forEach((file) => {
    const fpath = path.resolve(directory, file);
    if (
      fs.lstatSync(fpath).isFile() &&
      path.extname(fpath).toLowerCase() === '.json'
    ) {
      // console.log('Deleting file: ' + fpath);
      // delete file
      fs.unlinkSync(fpath);
    }
  });
};

const mergeJson = (directory) => {
  let data = [];
  fs.readdirSync(directory).forEach((file) => {
    const fpath = path.resolve(directory, file);
    if (
      fs.lstatSync(fpath).isFile() &&
      path.extname(fpath).toLowerCase() === '.json'
    ) {
      console.log('reading: ' + file);
      // read file
      const rawData = fs.readFileSync(fpath);
      const items = JSON.parse(rawData);
      // append to data
      data = [...data, ...items];
    }
  });
  return data;
};

const getJson = jsonPath => {
  const rawdata = fs.readFileSync(jsonPath);
  const json = JSON.parse(rawdata).sort((a, b) =>
    a.Brand.localeCompare(b.Brand)
  );
  return json;
}

const writeJson = (json, jsonPath, minify = false) => {
  const data = minify ? JSON.stringify(json) : JSON.stringify(json, null, 2);
  fs.writeFileSync(jsonPath, data);
}

module.exports = {
    getFileName,
    createJsonForBrand,
    deleteJson,
    getJson,
    mergeJson,
    writeJson
};
