import "/inkam/app/idb-master/build/idb.js";
const tabelku = idb.open('dbku', 1, db => {
    db.createObjectStore('tabelku');
  });
  

  