import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import firebase from 'firebase/app';
import 'firebase/database';

// var database = firebase.database();
const presenceRef = firebase.database().ref('/users/0');
// connectedRef.on('value', function(snap) {
//   if (snap.val() === true) {
//     alert('connected');
//   } else {
//     alert('not connected');
//   }
// });

// 用户数据文件初始化
const cacheFolderPath = remote.app.getPath('userData'); // 数据缓存文件夹
const filename = 'data.json'; // 用户数据的文件名
const userDateOutputFilename = path.join(cacheFolderPath, filename); // 用户数据文件所在路径
let isOnline = false;

function ErrHandler(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(userDateOutputFilename);
  }
}

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

//
export function netWorkStateHandler(callback) {
  const connectedRef = firebase.database().ref('.info/connected');
  connectedRef.orderByChild('main').on('value', snap => {
    isOnline = snap.val();
    callback(isOnline);
  });
}

/**
 * 把数据导出到data.json文件
 * @export Function
 * @param {Object} data
 */
export function outputLocalUserData(data) {
  fs.writeFileSync(userDateOutputFilename, JSON.stringify(data), err => {
    ErrHandler(err);
  });
}

// 多端更新无法准确删除
export async function syncList(list, localList) {
  // const updateList = JSON.parse(localStorage[`updateList`]);
  // 构建待删除map
  if (localStorage[`deleteList`]) {
    const deleteList = JSON.parse(localStorage[`deleteList`]);
    for (let j = 0; j < deleteList.length; j++) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].key === deleteList[j]) {
          await firebase
            .database()
            .ref(`/users/0/${i}`)
            .remove();
          break;
        }
      }
    }
    localStorage[`deleteList`] = JSON.stringify([]);
  }
  if (localStorage[`updateList`]) {
    const updates = {};
    const updateList = JSON.parse(localStorage[`updateList`]);
    for (let j = 0; j < updateList.length; j++) {
      for (let i = 0; i < localList.length; i++) {
        if (localList[i].key === updateList[j]) {
          updates[`/users/0/${i}`] = localList[i];
          break;
        }
      }
    }
    localStorage[`updateList`] = JSON.stringify([]);
    await firebase
      .database()
      .ref()
      .update(updates);
  }
  // const newList = await presenceRef.once('value');
  // presenceRef.set(newList.val().filter(e => e));
  // console.log(list);
  // 构建待更新map
}

/**
 * 数据导出
 * @export Function
 * @param {Object} data
 */
export function outputUserData(data, key, type) {
  // 设置本地
  outputLocalUserData(data);
  // 设置firebase
  if (isOnline) {
    presenceRef.set(data);
  } else {
    if (!localStorage[`${type}List`])
      localStorage[`${type}List`] = JSON.stringify([]);
    if (type === 'delete' && localStorage[`updateList`]) {
      const updateList: string[] = JSON.parse(localStorage[`updateList`]);
      let readyDelteIndex = updateList.indexOf(key);
      if (readyDelteIndex >= 0) {
        localStorage[`updateList`] = JSON.stringify([
          ...updateList.slice(0, readyDelteIndex),
          ...updateList.slice(readyDelteIndex + 1, updateList.length)
        ]);
        return;
      }
    }
    const oldArr: string[] = JSON.parse(localStorage[`${type}List`]);
    if (oldArr.includes(key)) return;
    let newArr = oldArr.concat([key]);
    localStorage[`${type}List`] = JSON.stringify(newArr);
  }
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
      else resolve(JSON.parse(data));
    });
  });
}

export function getUserDataFromNet(callback) {
  return new Promise(resolve => {
    presenceRef.on('value', snapshot => {
      const list = [];
      snapshot.forEach(e => {
        list.push(e.val());
      });
      callback(list);
      resolve(list);
    });
  });
}
