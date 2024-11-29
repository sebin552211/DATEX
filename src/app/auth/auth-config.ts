//Auth-config.ts
import {
    LogLevel,
    Configuration,
    BrowserCacheLocation,
} from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: '50dcc21f-c31a-4223-8329-7ef60995ece7', 
        authority: 'https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb', 
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200',
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                // console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false,
        },
    },
};

export const loginRequest = {
    scopes: [],
};

export const apiConfig = {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
};
 