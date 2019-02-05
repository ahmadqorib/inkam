if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }else{
    console.log('This browser support IndexedDB');
    return;
  }