import { Storage,Drivers } from '@ionic/storage';

export const storage = new Storage({
  name: '__mydb',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
});

storage.create();
