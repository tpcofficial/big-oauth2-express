# big-oauth2-express

## The big-oauth2 project

OAuth2 can be complicated and annoying, so we're trying to make it simpler!

big-oauth2 is a project aimed at simplifying the OAuth2 flow for people who are new to using the standard, this helps improve the security of authentication on new web applications as well as making them easier to access.

This project is ran for free by the public and we hope to make your life simpler!

### Parts of the project

- [big-oauth2](https://github.com/tpcofficial/big-oauth2) (An npm package for the project, this is our main priority at the moment)
- [big-auth2-express](https://github.com/tpcofficial/big-oauth2-express) (An npm package to easily implement routes for the OAuth2 flow)

## Example usage

```js
const config = {
    base_uri: ..., //Used to generate redirect uri's
    data_uri: ...,//uri to send key identifying user data fetched 
    Google: {
        client_id: ...,
        client_secret: ...,
    },
    Microsoft: {
        ...
    }
    ...
}

/* We create the handler for OAuth2 calls*/
const OAuth2Lib = require('big-oauth2-express')(config);
app.use("/api/oauth2", OAuth2Lib);

/**
 * app.use("/api/oauth2", OAuth2Lib); 
 * 
 * This single line will implement all the OAuth2 flows for all the platforms you specified in your configuration
 * 
 * For example if you configured Google, Discord and Azure AD (aka. Microsoft Enterprise, Microsoft Business, Office365 accounts and Microsoft365 accounts) the following endpoints would be automagically created:
 * 
 * Consent endpoints (start of the flow, you can create uri's pointing to these on things like login buttons!)
 *  - /api/oauth2/Discord/request
 *  - /api/oauth2/Google/request
 *  - /api/oauth2/microsoft-enterprise/request
 * 
 * Callback endpoints
 *  - /api/oauth2/callback
 * 
 * On the callback, the user will be forwarded to the uri/url you specified in data_uri!
 * 
*/

const myApp = require("express").Router();
app.use("/api/myapp",myApp);

myApp.get('/data-fw', async (req, res, next) => {
    OAuth2Lib.getData(req.query.identifier, (data,err) => {
        console.log(JSON.stringify(data)) // Hell yeah! We have an email, name, platform registered via and UUID from the platform for this user! We can use this data for authentication on our platform!
    });
});
 
```

## Flow  (hopefully)

1. User starts OAuth2 flow
    (1). Consent given
2. User enters callback
    (1). Auth code trade for token
    (2). Data retrieved
    (3). Data assigned a randomly generated 64-char long hex string for temporarily identifying the data in the flow (this is to stop the user modifying the data)
3. Data endpoint called
    (1). Use data identifier to get users data
    (2). You now have your data, you can use this for what you wish (usually for authentication purposes)!
