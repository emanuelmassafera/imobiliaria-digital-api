export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/imobiliaria-digital-db',
  port: Number(process.env.PORT) || 5050,
  jwtSecret: process.env.JWT_SECRET || '%C-3-1-7%'
}
