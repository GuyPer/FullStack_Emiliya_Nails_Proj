const Gallery= require('../models/Gallery');

// find the highest value on title field on MONGODB --> collection gallery
const getMaxTitleValue = async () => {
    try {
      const result = await Gallery.aggregate([
        {
          $addFields: {
            numericTitle: { $toInt: "$title" } // convert title from string to int
          }
        },
        {
          $sort: { numericTitle: -1 } // sort the numbers from high to low
        },
        {
          $limit: 1 // find the highrst value
        }
      ]);
  
      return result.length > 0 ? result[0].numericTitle : 0;
    } catch (error) {
      console.error("Error finding max title:", error);
      throw error;
    }
  };

  module.exports = {getMaxTitleValue}