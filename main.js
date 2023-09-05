
//imported modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require('axios');

//main window
const isDev = true;
const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1200 : 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.whenReady().then(() => {

  //initialize function
  ipcMain.handle('axios.openAI', openAI)
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//main function
async function openAI (){

  axios({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    },
    headers: {'X-Custom-Header': 'foobar'}
  });

  return "Hello World";
}
