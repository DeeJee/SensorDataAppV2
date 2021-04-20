//https://dev.to/theaswanson/adding-authentication-with-azure-ad-to-a-net-angular-web-app-with-msal-11a5
//https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

//https://docs.microsoft.com/en-us/azure/api-management/api-management-howto-protect-backend-with-aad#:~:text=To%20protect%20an%20API%20with,portal%20to%20register%20your%20application.


//https://docs.microsoft.com/en-us/samples/azure-samples/active-directory-aspnetcore-webapp-openidconnect-v2/how-to-secure-a-web-api-built-with-aspnet-core-using-the-azure-ad-b2c/
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  redirectUrl: 'http://localhost:4200',
  clientId: 'a5f77a6b-0a7a-40fc-9993-9191ab01efca', //SensordataApplication
  //clientId: '1af2a885-6aed-4fbf-8866-51321da47926',
  tenantName: 'dennisjansenonline',
  services: {
    sensorDataService: {
      host: "https://iotsensordata.azurewebsites.net:443",
      //host: "https://localhost:44399",
      //host: "https://localhost:58847",
      baseUrl: "/api"
    }
  }
};
