(function() {
    'use strict';
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
  
    var dbPromise = idb.open('test-db4', 1, function(upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains('people')) {
        var peopleOS = upgradeDb.createObjectStore('people', {keyPath: 'email'});
        peopleOS.createIndex('gender', 'gender', {unique: false});
        peopleOS.createIndex('ssn', 'ssn', {unique: true});
      }
      if (!upgradeDb.objectStoreNames.contains('notes')) {
        var notesOS = upgradeDb.createObjectStore('notes', {autoIncrement: true});
        notesOS.createIndex('title', 'title', {unique: false});
      }
      if (!upgradeDb.objectStoreNames.contains('logs')) {
        var logsOS = upgradeDb.createObjectStore('logs', {keyPath: 'id',
          autoIncrement: true});
      }
    });
  })();

  dbPromise.then(function(db) {
    var tx = db.transaction('store', 'readwrite');
    var store = tx.objectStore('store');
    var item = {
      name: 'sandwich',
      price: 4.99,
      description: 'A very tasty sandwich',
      created: new Date().getTime()
    };
    store.add(item);
    return tx.complete;
  }).then(function() {
    console.log('added item to the store os!');
  });
  