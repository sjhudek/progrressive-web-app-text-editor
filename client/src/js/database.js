import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Function to add content to the database
export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readwrite');
  const objectStore = transaction.objectStore('jate');
  objectStore.add({ content }); // You can add more properties if needed
  await transaction.complete;
  db.close();
};
;

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readonly');
  const objectStore = transaction.objectStore('jate');
  const request = objectStore.getAll();
  const data = await request.result;
  db.close();
  return data;
};

initdb();
