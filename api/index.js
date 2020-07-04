const Fs = require('fs')
const cors = require('cors')
const Express = require('express')

const app = Express()

const port = process.env.PORT || 3443

app.use(cors())

app.use(Express.static(__dirname + '/images'))

let products = JSON.parse(
  Fs.readFileSync(__dirname + '/products.json').toString(),
).map((product) => ({
  ...product,
  image: `/${product.id}.jpg`,
}))

app.get('/products', (req, res) => {
  let results = [...products]
  if (req.query.search) {
    results = products.filter((product) =>
      product.name.toLowerCase().match(req.query.search),
    )
  }

  if (req.query.priceFrom && req.query.priceTo) {
    results = products.filter(
      (product) =>
        product.priceUnformatted >= req.query.priceFrom &&
        product.priceUnformatted <= req.query.priceTo,
    )
  }

  return res.json(results)
})

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})
