
  (function() {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
  
    var dbPromise = indexedDB.open('test-db2', 1, function(upgradeDb) {
      console.log('making a new object store');
      if (!upgradeDb.objectStoreNames.contains('firstOS')) {
        upgradeDb.createObjectStore('firstOS');
      }
    });
  
  })();
      
  