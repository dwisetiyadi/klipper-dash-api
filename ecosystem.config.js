module.exports = {
  apps : [{
    name: 'klipper-dash-api',
    script: 'dist/index.js',
    instances: 0,
    autorestart: false,
    // max_memory_restart: '1G',
  }],
};
