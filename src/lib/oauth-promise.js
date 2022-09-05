//convert oauth methods to promises so we can use async/await syntax
//and keep our code sexier

module.exports = (oauthCallback) => {
  
  const CONSUMER_KEY = 'AqalFLnPChAGYP9phjFMPnmhf'; // process.env.CONSUMER_KEY;
  const CONSUMER_SECRET = '9qygxKXbyO5l0z2ANl5KvAY8PP3hGavA4VPcbwM0ujgfc1F3qO'; // process.env.CONSUMER_SECRET;

  const _oauth = new (require('oauth').OAuth)(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      CONSUMER_KEY, // consumer key
      CONSUMER_SECRET, // consumer secret
      '1.0',
      oauthCallback,
      'HMAC-SHA1'
  );
  
  const oauth ={
    getOAuthRequestToken: () => {
      console.log('CONSUMER_KEY ==>', CONSUMER_KEY);
    
      return new Promise((resolve, reject) => {
        _oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
          if(error) {
            console.log('request token ==>', error);
            reject(error);  
          } else {
            resolve({oauth_token, oauth_token_secret, results});  
          }
        });
      });
    },
    
    getOAuthAccessToken: (oauth_token, oauth_token_secret, oauth_verifier) => { 
      return new Promise((resolve, reject) => {
        _oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier, (error, oauth_access_token, oauth_access_token_secret, results) => {
          if(error) {
            reject(error);  
          } else {
            resolve({oauth_access_token, oauth_access_token_secret, results});  
          }
        });
      });
    },
    
    getProtectedResource: (url, method, oauth_access_token, oauth_access_token_secret) => {
       return new Promise((resolve, reject) => {
        _oauth.getProtectedResource(url, method, oauth_access_token, oauth_access_token_secret,  (error, data, response) => {
          if(error) {
            reject(error);  
          } else {
            resolve({data, response});  
          }
        });
      });   
    }
    
  };
  
  return oauth;
}
