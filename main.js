const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const isDev = process.env.NODE_ENV !== 'production';

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('isDev:', isDev);

// Store yapılandırması
const store = new Store();

// Default kullanıcı
const defaultUser = {
    id: 1,
    name: 'Demo Kullanıcı',
    role: 'admin',
    email: 'demo@hudayi.com',
    preferences: {
        currency: 'TRY',
        language: 'tr'
    }
};

function createWindow() {
    console.log('Pencere oluşturuluyor...');
    
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (isDev) {
        console.log('Development modunda çalışıyor...');
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    } else {
        console.log('Production modunda çalışıyor...');
        win.loadFile(path.join(__dirname, 'build/index.html'));
    }

    // Pencere hazır olduğunda
    win.webContents.on('did-finish-load', () => {
        console.log('Pencere yüklendi');
    });

    // Hata durumunda
    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Pencere yüklenirken hata:', errorCode, errorDescription);
    });
}

// App events
app.whenReady().then(() => {
    console.log('Uygulama başlatılıyor...');
    createWindow();

    // IPC Handlers
    ipcMain.handle('get-user', () => {
        console.log('Kullanıcı bilgisi istendi');
        const user = store.get('user');
        if (!user) {
            console.log('Default kullanıcı döndürülüyor:', defaultUser);
            store.set('user', defaultUser);
            return defaultUser;
        }
        console.log('Mevcut kullanıcı döndürülüyor:', user);
        return user;
    });

    ipcMain.handle('set-user', (event, user) => {
        console.log('Kullanıcı bilgisi güncelleniyor:', user);
        store.set('user', user);
        return user;
    });

    app.on('activate', () => {
        console.log('Activate event tetiklendi');
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    console.log('Tüm pencereler kapatıldı');
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Hata yakalama
process.on('uncaughtException', (error) => {
    console.error('Yakalanmamış hata:', error);
});
