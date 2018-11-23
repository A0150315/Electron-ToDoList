/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } from 'electron';
import path from 'path';
import MenuBuilder from './menu';

// const sqlite3 = require('sqlite3').verbose();

let mainWindow = null;
let tray = null;
const trayIconNative = nativeImage.createFromPath(
  path.join(__dirname, './ico.ico')
);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  // const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  console.log(app.getPath('userData')); // 用于存储 app 用户数据目录

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    title: '略略略',
    show: true,
    width: 250,
    height: 400,
    center: true,
    resizable: false,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    icon: path.join(__dirname, '/ico.ico'),
    maximizable: false,
    minimizable: false
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
    // 初始化 Tray
    tray = new Tray(trayIconNative);
    tray.setToolTip('Chan List');
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: '退出',
          click: () => {
            app.quit();
          }
        }
      ])
    );
    // -----------------------------
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

// ipc主程序监听add事件创建新窗口
ipcMain.on('add', () => {
  let newwin = new BrowserWindow({
    width: 600,
    height: 400,
    frame: true,
    parent: mainWindow // win是主窗口
  });
  newwin.loadURL(`file://${__dirname}/test.html`); // new.html是新开窗口的渲染进程
  newwin.on('closed', () => {
    newwin = null;
  });
});
