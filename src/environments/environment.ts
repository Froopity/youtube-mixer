// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Keys} from './keys';

export const environment = {
  production: false,
  firebase: {
    apiKey: Keys.FIREBASE_API_KEY,
    authDomain: 'mixer-37fd9.firebaseapp.com',
    databaseURL: 'https://mixer-37fd9.firebaseio.com',
    projectId: 'mixer-37fd9',
    storageBucket: 'mixer-37fd9.appspot.com',
    messagingSenderId: '460464382876',
    appId: '1:460464382876:web:4bbcc4ec6f56e645b61e59',
    measurementId: 'G-63JY572NYD'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
