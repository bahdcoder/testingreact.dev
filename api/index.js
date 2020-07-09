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

let cart = []

const findProduct = (id) =>
  products.find((product) => id === product.id.toString())

app.get('/products/:product', (req, res) => {
  const product = findProduct(req.params.product)

  if (!product) {
    return res.status(404).json({
      message: `Product ${req.params.product} not found.`,
    })
  }

  return res.json(product)
})

app.post('/cart/:product', (req, res) => {
  const product = findProduct(req.params.product)

  if (!product) {
    return res.status(404).json({
      message: `Product ${req.params.product} not found.`,
    })
  }

  const inCart = cart.find(
    (product) => product.id.toString() === req.params.product,
  )

  if (!inCart) {
    cart = [...cart, product]
  }

  return res.json(cart)
})

app.delete('/cart/:product', (req, res) => {
  const product = findProduct(req.params.product)

  if (!product) {
    return res.status(404).json({
      message: `Product ${req.params.product} not found.`,
    })
  }

  const inCart = cart.find(
    (product) => product.id.toString() === req.params.product,
  )

  if (inCart) {
    cart = cart.filter(
      (product) => product.id.toString() !== req.params.product,
    )
  }

  return res.json(cart)
})

app.get('/cart', (req, res) => {
  return res.json(cart)
})

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

app.post('/checkout', (req, res) => {
  cart = []

  return res.json({
    message: 'Checked out !',
  })
})

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`)
})
