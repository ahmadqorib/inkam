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

			request.onsuccess = function(e){
				db = e.target.result;
				console.log("success");

				var objectStore = db.transaction('tbl_info').objectStore('tbl_info');

			   	objectStore.openCursor().onsuccess = function (event) {
			     	var cursor = event.target.result;

			     	if (cursor) {
			       		//console.log('Id: ' + cursor.key);
			       		//console.log('Name: ' + cursor.value.name);
			       		//console.log('Age: ' + cursor.value.location);
			       		//console.log('Email: ' + cursor.value.description);
			       		let dNm, dLk, dDk, dId, dFt = '';
			      		dId = cursor.key;
			      		dNm = cursor.value.name;
			      		dLk = cursor.value.location;
			      		dFt = cursor.value.foto;
			      		dDk = cursor.value.description;

				      	var nm = document.createElement("h4");
				      	var lk = document.createElement("p");
				      	var dk = document.createElement("p");
				      	var rm = document.createElement("a");
				      	var ft = document.createElement("img");

				      	nm.appendChild(document.createTextNode(dNm));
				      	lk.appendChild(document.createTextNode(dLk));
				      	dk.appendChild(document.createTextNode(dDk));
				      	rm.appendChild(document.createTextNode("Read More"));
				      	rm.setAttribute('href', "detail.html?id="+dId);
				      	ft.appendChild(document.createTextNode(dFt));
				      	ft.setAttribute('src', dFt);
				      	ft.setAttribute('style', 'max-width:100%;');

				      	var element = document.getElementById("shw");
				      	element.appendChild(nm);
				      	element.appendChild(lk);
				      	element.appendChild(dk);   
				      	element.appendChild(rm);
				      	element.appendChild(ft);

			       		cursor.continue();
			    	} else {
			      		console.log('No more data');
			    	}
			  	};
			}

		} 
   		return info;
 	})
 	.catch(error => {
      console.log('Error, ', error);
    });