function ConvertHandler() {

  this.getNum = function(input) {
    let result = [];
    if (/^(km|mi|gal|L|lbs|kg)$/.test(input)){return 1}
    const tempResult = input.match(/(?!.*\/.*\/)(^\d+)([.]\d+)?(\/\d+([.]\d)?)?/)
    if (!tempResult){return 'invalid number'}
    result = tempResult[0]
    if (result.includes('/')) {
      let temp = result.split('/')

      if (temp.length !== 2)
        return 'invalid number'

      result = parseFloat(temp[0]) / parseFloat(temp[1])
    }
    return parseFloat(result);
  };

  this.getUnit = function(input) {
    let result;
    result = input.match(/(km|mi|gal|L|lbs|kg)$/i)
    if (!result) {return 'invalid unit'}
    if (result[0].toLowerCase() === 'l'){return 'L'}

    return result[0].toLowerCase();
  };

  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'gal':
        return 'L'
      case 'L':
        return 'gal'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'
    }
    return false;
  };

  this.spellOutUnit = function(unit) {
    switch(unit){
      case 'gal':
        return 'gallons'
      case 'L':
        return 'liters'
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
    }
    return false;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'gal':
        return (galToL * initNum)
      case 'lbs':
        return lbsToKg * initNum
      case 'mi':
        return miToKm * initNum
      case 'L':
        return initNum / galToL
      case 'kg':
        return initNum / lbsToKg
      case 'km':
        return initNum / miToKm
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return (initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + Number(returnNum).toFixed(5) + ' ' + this.spellOutUnit(returnUnit))
  };

}

module.exports = ConvertHandler;
