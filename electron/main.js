const {app, BrowserWindow, ipcMain} = require('electron')
const path = require ('path');
const url = require ('url');
const isDev = require('electron-is-dev');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, './preload.js')
    }
  })



  if(isDev) {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
  } else {
    const startUrl = url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  });
    mainWindow.loadURL(startUrl);
  }
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// ipcMain.on("main", async (event, ...args) => {
//   const { stdout } =  await exec('udevadm info --query=all --name=/dev/nvme0n1p1  | grep ID_PART_ENTRY_UUID');
//   const product = await stdout.replace("E:", "").replace("ID_PART_ENTRY_UUID=", "").trim().toString().toUpperCase();
//   event.sender.send("render", {product})
// })

ipcMain.on('hhdid', (event) => findDevice(event));
const findDevice = async (event) => {
  const { stdout } =  await exec('udevadm info --query=all --name=/dev/nvme0n1p1  | grep ID_SERIAL_SHORT');
  if(stdout){
  const product = stdout.replace("E:", "").replace("ID_SERIAL_SHORT=", "").trim().toString().toUpperCase();

  return event.returnValue = product;
  }
}

ipcMain.on('idProcess', (event) => idProcess(event));
const idProcess = async (event) => {
  const { stdout } =  await exec('udevadm info --query=all --name=/dev/nvme0n1p1 | grep ID_PART_ENTRY_UUID');
  if(stdout){
  const product = stdout.replace("E:", "").replace("ID_PART_ENTRY_UUID=", "").trim().toString().toUpperCase();

  return event.returnValue = stdout;
  }
}