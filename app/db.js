(function() {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesnt support IndexedDB');
      return;
    }
  
    var dbPromise = idb.open('db_inkam', 1);
  
  })();
  