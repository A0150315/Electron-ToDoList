import fs from 'fs';
import path from 'path';
import { remote } from 'electron';

// 用户数据文件初始化
const cacheFolderPath = remote.app.getPath('userData'); // 数据缓存文件夹
const filename = 'data.json'; // 用户数据的文件名
const userDateOutputFilename = path.join(cacheFolderPath, filename); // 用户数据文件所在路径
if (!fs.existsSync(userDateOutputFilename)) {
  fs.writeFile(userDateOutputFilename, '', err => {
    ErrHandler(err);
  });
}

// 图片缓存文件夹初始化
const imgFolderPath = remote.app.getPath('userCache'); // 图片缓存文件夹路径
if (!fs.existsSync(imgFolderPath)) {
  fs.mkdirSync(imgFolderPath);
}

/**
 * 把数据导出到data.json文件
 * @export Function
 * @param {Object} data
 */
export function outputUserData(data) {
  fs.writeFileSync(userDateOutputFilename, JSON.stringify(data), err => {
    ErrHandler(err);
  });
}

/**
 * 复制原图到本地缓存
 * @export Function
 * @param {string} fileName
 * @param {string} filePath
 * @returns destPath:Promise<string>
 */
export function outputImgCache(fileName, filePath) {
  return new Promise(resolve => {
    const destPath = path.join(imgFolderPath, fileName); // 输出文件名
    const readStream = fs.createReadStream(filePath); // 输入流
    const writeStream = fs.createWriteStream(destPath); // 输出流
    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
      resolve(destPath);
    });
  });
}

/**
 * 获取data.json文件的数据
 * @export Function
 * @returns userData:Promise<jsonString>
 */
export function getUserData() {
  return new Promise((resolve, reject) => {
    fs.readFile(userDateOutputFilename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function ErrHandler(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(userDateOutputFilename);
  }
}
