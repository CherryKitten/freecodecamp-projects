'use strict';
const ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {

  const convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    let error
    const input = req.query.input
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    if (initNum === 'invalid number') {error = 'invalid number'}
    if (initUnit === 'invalid unit') {if (!error){ error = 'invalid unit'} else {error = 'invalid number and unit'}}
    if (error){res.json(error)}
    const returnNum = parseFloat(convertHandler.convert(initNum, initUnit).toFixed(5))
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({ initNum, initUnit, returnNum, returnUnit, string })
  })
};
