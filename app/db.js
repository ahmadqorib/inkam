Components.utils.importGlobalProperties(["indexedDB"]);

// From here on, it's like using IndexedDB from content
var req = indexedDB.open("my-database");

  