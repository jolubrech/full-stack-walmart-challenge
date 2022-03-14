const discounts = require('../../../../models/Discounts');

const getDiscountsRouteController = async ctx => {


    ctx.body = await discounts.find({}, async (error, results) => {

        if (error) {
            console.error(error)
        }
        return results;
    });

}


module.exports = { getDiscountsRouteController }
