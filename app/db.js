 (function() {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
  
    var dbPromise = indexedDB.open('test-db4', 1, function(db) {
        db.createObjectStore('tbl_info');
    });

  })();

  
  