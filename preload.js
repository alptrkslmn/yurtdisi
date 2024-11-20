const { contextBridge, ipcRenderer } = require('electron');

// API'leri expose et
contextBridge.exposeInMainWorld('electron', {
    // Kullanıcı yönetimi
    getUser: () => ipcRenderer.invoke('get-user'),
    setUser: (user) => ipcRenderer.invoke('set-user', user),

    // Platform bilgisi
    platform: process.platform,
    
    // Versiyon bilgisi
    versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
});
