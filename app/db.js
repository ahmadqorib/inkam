
  
    //check for support
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
    }
  
    const tabelku = indexedDB.open('dbku', 1, db => {
        // db.createObjectStore('tabelku');
        db.then(function(db) {
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
      });


      
  