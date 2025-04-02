const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json()); // Middleware para manejar JSON

// Products
let products = [
    { id: 1, name: "Cocktail", price: 40 },
    { id: 2, name: "Ice cream", price: 20 },
    { id: 3, name: "Waffle", price: 30 }
];

// Get all of the products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get a product for id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
});

// Post new product
app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
    
    if (!id || !name || !price) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: "El ID ya existe" });
    }

    const newProduct = { id, name, price };
    products.push(newProduct);
    
    res.status(201).json(newProduct);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
