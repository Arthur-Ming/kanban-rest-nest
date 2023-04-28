export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    uri: process.env.MONGO_CONNECTION_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'secret',
    expiresIn: '24h',
  },
});
