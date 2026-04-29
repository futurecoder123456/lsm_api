// server.js
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

import bookRoutes from '../src/routes/bookRoutes.js';
import userRoutes from '../src/routes/userRoutes.js';
import reviewRoutes from '../src/routes/reviewRoutes.js';
import loanRoutes from '../src/routes/loanRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;
const swaggerDoc = YAML.load('./src/docs/openapi.yaml');

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(cors({
  origin: '*'}));

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Library API is running'
  });
});

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/loans', loanRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Global Error Handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if(!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

if(environment !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
export default app;
