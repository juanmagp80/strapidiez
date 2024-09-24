module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['6b7a19550ed780f74b4ec9d85ad4ca190e8f347e219b3fead74ffc948dd4f9bb9dbc5c98febd20250cfba9885b59d37dbd0d7a66ccd36fe2ab95680620ef1307', '40dd77ee00456db52e99816f40fec820b2159161da08672e80a11c1194bf3df24e5b71401ec9e7ef9a93639b0d4db497ff1d688c5e23c9a70472857570197a5d']),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
