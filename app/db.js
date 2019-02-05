
var info = indexedDB.open('db_inkam', 1, db => {
    db.createObjectStore('info');
  });
  
info.then(function(db) {
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
  