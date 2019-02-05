
const info = indexedDB.open('db_inkam', 1, db => {
    db.createObjectStore('info');
  });
  

  