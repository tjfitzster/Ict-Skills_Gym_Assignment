
/**
 * The category is determined by the magnitude of the members BMI according to the following:
 *
 *     BMI less than    15   (exclusive)                      is "VERY SEVERELY UNDERWEIGHT"
 *     BMI between      15   (inclusive) and 16   (exclusive) is "SEVERELY UNDERWEIGHT"
 *     BMI between      16   (inclusive) and 18.5 (exclusive) is "UNDERWEIGHT"
 *     BMI between      18.5 (inclusive) and 25   (exclusive) is "NORMAL"
 *     BMI between      25   (inclusive) and 30   (exclusive) is "OVERWEIGHT"
 *     BMI between      30   (inclusive) and 35   (exclusive) is "MODERATELY OBESE"
 *     BMI between      35   (inclusive) and 40   (exclusive) is "SEVERELY OBESE"
 *     BMI greater than 40   (inclusive)                      is "VERY SEVERELY OBESE"
 */
const userinfo = require("../models/user-store");

const bmiCatagory = {

  getCatagory(bmi) {
    if (bmi < 15) {
      return "VERY SEVERELY UNDERWEIGHT";
    }
    else if ((bmi >= 15) && (bmi < 16)) {

      return "SEVERLY UNDERWEIGHT";
    }
    else if ((bmi >= 16) && (bmi < 18.5)) {
      return "UNDERWEIGHT";
    }
    else if ((bmi >= 18.5) && (bmi < 25)) {
      return "NORMAL";
    }
    else if ((bmi >= 25) && (bmi < 30)) {
      return "OVERWEIGHT";
    }
    else if ((bmi >= 30) && (bmi < 35)) {
      return "MODERATELY OBESE";
    }
    else if ((bmi >= 35) && (bmi < 40)) {
      return "SEVERELY OBESE";
    }
    else if (bmi >= 40) {
      return "VERY SEVERELY OBESE";
    }
  },

  calculate_firstbmi(id){
    let user = userinfo.getUserById(id);
    let bmi = (user.startingWeight / ((user.height) *(user.height)))

    return bmi;

  }
};



module.exports = bmiCatagory;