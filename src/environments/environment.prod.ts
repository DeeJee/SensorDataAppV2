export const environment = {
  production: true,
  redirectUrl: 'https://sensordataapp.azurewebsites.net',
  clientId: 'a5f77a6b-0a7a-40fc-9993-9191ab01efca', //SensordataApplication
  //clientId: '1af2a885-6aed-4fbf-8866-51321da47926',
  tenantName: 'dennisjansenonline',
  
  services: {
    sensorDataService: {
      host: "https://iotsensordata.azurewebsites.net:443",
      baseUrl: "/api"
    }
  } 
};
