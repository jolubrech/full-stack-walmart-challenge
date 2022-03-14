const products = require('../../../../models/Products');

const getProductRouteController = async ctx => {

    ctx.body = await products.find({}, async (error, results) => {

        if (error) {
            console.error(error)
        }
        return results;
    });


}

const getProductByBrandsRouteController = async ctx => {

    console.log("Query params", ctx.request.query.brands);
    let queryFilters
    if (Object.keys(ctx.request.query).length !== 0) {
        queryFilters = ctx.request.query.brands.split(',')
    } else {
        ctx.status = 400
        ctx.body = "Solicitud malformada"
        return ctx
    }
    console.log(queryFilters)
    ctx.body = await products.find({ brand: { $in: queryFilters } }, async (error, results) => {

        if (error) {
            console.error(error)
        }
        return results;
    });


}


module.exports = { getProductRouteController, getProductByBrandsRouteController }
