const { pingRouteController } = require('./controllers/ping')
const { getProductRouteController } = require('./controllers/product')
const { getProductByBrandsRouteController } = require('./controllers/product')
const { getDiscountsRouteController } = require('./controllers/discount')

function loadRoutes(router) {
  router.get('/ping', pingRouteController)

  router.get('/products', getProductRouteController)
  router.get('/discounts', getDiscountsRouteController)
  router.get('/productsByBrand', getProductByBrandsRouteController)
  return router
}

module.exports = { loadRoutes }
