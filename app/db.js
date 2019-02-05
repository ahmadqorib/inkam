const tabelInformasi = idb.open('dbInkam', 1, db => {
    db.createObjectStore('tabelInformasi');
  });