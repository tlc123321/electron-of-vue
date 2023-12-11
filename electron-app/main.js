const { app, BrowserWindow} = require('electron');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  if(NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, './vue_dist/index.html'));
  }
};
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit();
  });  
});