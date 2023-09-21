const express = require('express')
const app = express()

const port = 3000

app.listen(port, _ => console.log(`App running on ${port}`))

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];


app.get('/products', (req, res) => res.send(products))

app.get('/products/:id', (req, res) => {
    const id = req.params.id
    const product = products.filter(product => product.id === parseInt(id) ? product : null)
    res.send(product)
})

app.get('/products/search/p', (req, res) => {
    const searchQuery = req.query.q.toLowerCase();
    const {minPrice, maxPrice} = req.query;
    const product = products.filter(product => product.name.toLowerCase().includes(searchQuery) && product.price > minPrice && product.price < maxPrice)
    res.send(product)
})

app.post('/products', (req, res) => {
    const {name, price} = req.query
    const newProduct = {id : products.length++, name , price: parseInt(price)}
    products.push(newProduct)
    res.send(products)
})

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, price } = req.query;
    const itemIdx = products.findIndex(product => product.id === parseInt(id));
    name ? products[itemIdx].name = name : name
    price ? products[itemIdx].price = parseInt(price) : price
    res.send(products[itemIdx]);
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const itemIdx = products.findIndex(product => product.id === parseInt(id));
    products.splice(itemIdx, 1);
    res.send(`Item has been deleted successfully !`)
  });
