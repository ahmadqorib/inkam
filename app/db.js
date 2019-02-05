
  (function() {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
  
    var dbPromise = indexedDB.open('couches-n-things', 1, function(upgradeDb) {
        switch (upgradeDb.oldVersion) {
          case 0:
            // a placeholder case so that the switch block will
            // execute when the database is first created
            // (oldVersion is 0)
          case 1:
            console.log('Creating the products object store');
            upgradeDb.createObjectStore('products', {keyPath: 'id'});
          case 2:
            console.log('Creating a name index');
            var store = upgradeDb.transaction.objectStore('products');
            store.createIndex('name', 'name', {unique: true});
      
          // TODO 4.2 - create 'price' and 'description' indexes
      
          // TODO 5.1 - create an 'orders' object store
      
        }
      });
      
  
  })();
      
  