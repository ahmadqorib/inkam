var info = "";

fetch('/inkam/data/info.json')
  	.then((response) => {
   		if(response.ok) {
     		return response.json();
   		} else {
     		throw new Error('Server response wasn\'t OK');
   		}
 	})
 	.then((json) => {
	   	info = json;
	   	console.log(info);

        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		
		if(window.indexedDB){
			var db;
			var request = indexedDB.open("db_inkam", 1);
			db = this.result

			request.onerror = function(e){
			  	console.log('onerror!');
  				console.dir(e);
			}

			request.onupgradeneeded = function(e){
				db = e.target.result;
				var objectStore = db.createObjectStore("tbl_info", {keyPath: "id_info"});
				objectStore.createIndex("info_name", "info_name", {unique: false});
				objectStore.createIndex("info_image", "info_image", {unique: false});
				objectStore.createIndex("info_desc", "info_desc", {unique: false});
				objectStore.transaction.oncomplete = function(e){
					var store = db.transaction(["tbl_info"], "readwrite").objectStore("tbl_info");
					for( var i = 0 ; i < info.data.length ; i++){
						store.add(info.data[i]);
					}
				}
			}

		} 
   		return info;
 	})
 	.catch(error => {
      console.log('Error, ', error);
    });

    var kampus = "";

    fetch('/inkam/data/kampus.json')
  	.then((response) => {
   		if(response.ok) {
     		return response.json();
   		} else {
     		throw new Error('Server response wasn\'t OK');
   		}
 	})
 	.then((json) => {
	   	kampus = json;
	   	console.log(kampus);

        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		
		if(window.indexedDB){
			var db;
			var request = indexedDB.open("db_inkam", 1);
			db = this.result

			request.onerror = function(e){
			  	console.log('onerror!');
  				console.dir(e);
			}

			request.onupgradeneeded = function(e){
				db = e.target.result;
				var objectStore = db.createObjectStore("tbl_kampus", {keyPath: "id_kampus"});
				objectStore.createIndex("kampus_name", "kampus_name", {unique: false});
				objectStore.createIndex("kampus_logo", "kampus_logo", {unique: false});
				objectStore.transaction.oncomplete = function(e){
					var store = db.transaction(["tbl_kampus"], "readwrite").objectStore("tbl_kampus");
					for( var i = 0 ; i < kampus.data.length ; i++){
						store.add(kampus.data[i]);
					}
				}
			}

		} 
   		return kampus;
 	})
 	.catch(error => {
      console.log('Error, ', error);
    });