const { NODE_ENV, HOST, PORT } = process.env;

export default {
  IS_PROD: NODE_ENV === 'production',
  HOST: typeof HOST === 'undefined' ? 'localhost' : HOST,
  PORT: typeof PORT === 'undefined' ? 4020 : parseInt(PORT),
};
