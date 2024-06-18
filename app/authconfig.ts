// authConfig.js
export const spotifyAuthConfig = {
    issuer:'https://acounts.spotify.com',
    clientId: 'f220d293d7fd410ab21d0fa1242a4dd7',
    redirectUrl: 'com.spotifyapp.myapp:/callback',
    scopes: [
      'user-read-email',
      'user-read-private',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
      revocationEndpoint: 'https://accounts.spotify.com/api/token/revoke'
    }
  };
  