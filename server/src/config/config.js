const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach((envVariable) => {
    process.env[envVariable] = envConfig[envVariable];
  });
}
