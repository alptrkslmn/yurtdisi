const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    database: {
        getCategories: () => ipcRenderer.invoke('getCategories'),
        addCategory: (category) => ipcRenderer.invoke('addCategory', category),
        deleteCategory: (id) => ipcRenderer.invoke('deleteCategory', id),
        getCurrencies: () => ipcRenderer.invoke('getCurrencies')
    }
});
