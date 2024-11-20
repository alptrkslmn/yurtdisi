const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // Burada gerekli API'leri tanımlayabiliriz
});
