const express = require('express')
const app = express()

const middleware = require('./middleware')

const port = 3000

app.set('view engine', 'ejs')
app.listen(port, _ => console.log(`App running on ${port}`))

let products = [
    { id: 1, img: "img.jpg", name: 'iPhone 12 Pro', price: 1099.99, des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus omnis cumque minima, similique illum!' },
    { id: 2, img: "img.jpg", name: 'Samsung Galaxy S21', price: 999.99, des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus omnis cumque minima, similique illum!' },
    { id: 3, img: "img.jpg", name: 'Sony PlayStation 5', price: 499.99, des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus omnis cumque minima, similique illum!' },
    { id: 4, img: "img.jpg", name: 'MacBook Pro 16', price: 2399.99, des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus omnis cumque minima, similique illum!' },
    { id: 5, img: "img.jpg", name: 'DJI Mavic Air 2', price: 799.99, des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus omnis cumque minima, similique illum!' },
  ];
  
app.use(express.static('public'))

app.use(middleware.loggingMiddleware)
app.use(middleware.errorHandlingMiddleware)

app.get('/', (req, res) => { 
    res.render('home', {products})
})

app.get('/productDetails/:id', (req, res) => {
    const id = req.params.id
    const itemIdx = products.findIndex(product => product.id === parseInt(id));
    res.render('productDetails', {productItem: products[itemIdx]})
        
})

app.get('/products/search/p', (req, res) => {
    const searchQuery = req.query.q.toLowerCase();
    const {minPrice, maxPrice} = req.query;
    const product = products.filter(product => product.name.toLowerCase().includes(searchQuery) && product.price > minPrice && product.price < maxPrice)
    res.send(product)
})

app.post('/product', (req, res) => {
    const {img, name, price, des} = req.query
    const newProduct = {id : products.length++, name, img, des , price: parseInt(price)}
    products.push(newProduct)
    res.send(products)
})

app.put('/editProduct/:id', (req, res) => {
    const id = req.params.id;
    const { name, price } = req.query;
    const itemIdx = products.findIndex(product => product.id === parseInt(id));
    name ? products[itemIdx].name = name : name
    img ? products[itemIdx].img = img : img
    des ? products[itemIdx].des = des : des
    price ? products[itemIdx].price = parseInt(price) : price
    res.send(products[itemIdx]);
});

app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    const itemIdx = products.findIndex(product => product.id === parseInt(id));
    products.splice(itemIdx, 1);
    res.send(`Item has been deleted successfully !`)
  });
