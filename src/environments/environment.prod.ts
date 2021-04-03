export const environment = {
  production: true,
  services: {
    sensorDataService: {
      host: "https://iotsensordata.azurewebsites.net:443",
      baseUrl: "/api"
    }
  },

  adalConfig: {
    tenant: 'd8a301f0-aca0-4e3f-91a4-abcc333dd26b',
    clientId: '1af2a885-6aed-4fbf-8866-51321da47926',
    redirectUri: 'https://sensordataapp.azurewebsites.net',
    cacheLocation: 'localStorage',
    endpoints:{
      "https://iotsensordata.azurewebsites.net:443":"b943f1f0-a291-4126-85f6-75a89d735d25"
    }
  }
};
