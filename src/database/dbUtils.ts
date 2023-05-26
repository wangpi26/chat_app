import { Storage,Drivers } from '@ionic/storage';

import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


export const storage = new Storage({
  name: '__mydb',
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
});
await storage.defineDriver(CordovaSQLiteDriver);

storage.create();