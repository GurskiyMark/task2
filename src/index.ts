import express from 'express'
import { productsRouter } from './routes/products-router';
import { addressesRouter } from './routes/addresses-router';

const app = express();

const PORT = process.env.PROT || 5000
app.use(express.json());

app.use(`/products`,productsRouter )
app.use(`/addresses`, addressesRouter)


app.listen(PORT, () => {
    console.log(`Server start on PORT: ${PORT} ✈️`);
})