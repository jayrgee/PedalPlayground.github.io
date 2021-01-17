'use strict';

const path = require('path');

const recycle = require('./data-utils');

const publicDataRoot = 'public/data/';
const appDataRoot = 'app/data/';
const pedalDataRoot = path.resolve(appDataRoot, 'pedals');
const pedalboardDataRoot = path.resolve(appDataRoot, 'pedalboards');

const recyclePedalData = () => {
  // clean
  recycle.deleteJson(pedalDataRoot);

  const pedals = recycle.getJson(path.resolve(publicDataRoot, 'pedals.json'));

  // extract (lowercase) brands
  const brands = [...new Set(pedals.map((p) => p.Brand.toLowerCase()))];

  console.log(brands);

  brands.forEach((brand) => {
    recycle.createJsonForBrand(pedals, brand, pedalDataRoot);
  });
};

const recyclePedalboardData = () => {
  // clean
  recycle.deleteJson(pedalboardDataRoot);

  const pedalboards = recycle.getJson(
    path.resolve(publicDataRoot, 'pedalboards.json')
  );

  // extract (lowercase) brands
  const brands = [...new Set(pedalboards.map((p) => p.Brand.toLowerCase()))];

  console.log(brands);

  brands.forEach((brand) => {
    recycle.createJsonForBrand(pedalboards, brand, pedalboardDataRoot);
  });
};

const mergePedalData = () => {
  // merge pedal data -> public data
  const pedalData = recycle.mergeJson(pedalDataRoot);

  recycle.writeJson(
    pedalData,
    path.resolve(publicDataRoot, 'pedals-min.json'),
    true
  );
  recycle.writeJson(pedalData, path.resolve(publicDataRoot, 'pedals.json'));
};

const mergePedalboardData = () => {
  // merge data -> public data
  const pedalboardData = recycle.mergeJson(pedalboardDataRoot);

  recycle.writeJson(
    pedalboardData,
    path.resolve(publicDataRoot, 'pedalboards-min.json'),
    true
  );
  recycle.writeJson(
    pedalboardData,
    path.resolve(publicDataRoot, 'pedalboards.json')
  );
};

module.exports = {
  mergePedalData,
  mergePedalboardData,
  recyclePedalData,
  recyclePedalboardData,
};
