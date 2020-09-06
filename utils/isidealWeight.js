
const userinfo = require("../models/user-store");

const isidealWeight = {

  isidealWeightCalc(id) {
    let user = userinfo.getUserById(id);

    let fiveFeet = 60.0; // 5 feet = 6 inches
    let idealBodyWeight = 0;
    let inches = this.convertMetresToInches(user.height, 2);

    if (inches <= fiveFeet) {
      if (user.gender === "F") {
        idealBodyWeight = 50;
      } else {
        idealBodyWeight = 45.5;
      }
    }
    else
    {
      if (user.gender === "M") {
        idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
      } else {
        idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
      }
    }
    return ((idealBodyWeight <= (user.startingWeight + 2.0))
      && (idealBodyWeight >= (user.startingWeight - 2.0))
    );
  },

  convertMetresToInches(numberToConvert, precision)
{
  return Math.round(numberToConvert * 39.37, precision);
}

};

module.exports = isidealWeight;