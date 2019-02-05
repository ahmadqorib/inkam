
  (function() {
    'use strict';
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
    }
  
    const tabelku = indexedDB.open('dbku', 1, db => {
        // db.createObjectStore('tabelku');
        console.log('making a new object store');
        if (!db.objectStoreNames.contains('firstOS')) {
        db.createObjectStore('firstOS');
        }
      });

    })();
      
  