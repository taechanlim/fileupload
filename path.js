const path = require('path')

// 윈도우: C:\program files (x86)\ ...
// 리눅스: /home/desktop-21331/workspace /....

// let dir
// if( os.platform() === 'windows' ){
//     dir = 'C:\\'
// }else if(os.platform() === 'linux' ){
//     dir = '/home'
// }

console.log(__dirname)
let dir1 = path.join(__dirname,'ingoo.js') //경로생성(절대경로 무시)
dir2 = path.resolve(__dirname,'ingoo.js') //경로생성(절대경로 존중)
// console.log(dir1,dir2)

//4가지 케이스를 알아볼겁니다.
//server.js 에서 js라는 텍스트만 얻고싶으면..
let str = 'server.js'
console.log(str.split('.')[1])
console.log(path.extname('server.js')) //확장자만 가져올수 있습니다.
console.log(path.dirname('/home/limtaechan/workspace/20220315/multer/ingoo.js '))
console.log(path.basename('/home/limtaechan/workspace/20220315/multer/ingoo.js ','.js'))

