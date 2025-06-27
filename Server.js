require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const viewRoutes = require('./routes/views');
const sessionRoutes = require('./routes/sessions');
const Product = require('./models/product');
const initializePassport = require('./config/passport');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/', viewRoutes);

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('addProduct', async (productData) => {
        try {
            const newProduct = await Product.create(productData);
            const products = await Product.find().lean();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await Product.findByIdAndDelete(id);
            const products = await Product.find().lean();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    });
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
        const PORT = process.env.PORT || 3000;
        httpServer.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error de conexión a MongoDB:', err);
    });