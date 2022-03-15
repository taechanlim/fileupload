const { urlencoded } = require('express')
const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const multer = require('multer')
const path = require('path')

//path 
//os

//request message -> body영역을 읽는방법을 2가지를 배웠습니다.
//application/x-www-from ~~ 
//application/json
//원래 express엔 req.body를 못읽는데 app.use()로 읽게만들어줍니다.
app.use(express.json())
app.use(express.urlencoded({extended:true,}))
//multipart/form-data 는 외부 라이브러리가 필요.multer -> 미드웨어 역할을 해줍니다.
// multer 는 함수인데 객체로 바꿔주는 작업을 해줘야합니다.
// 그 객체 안에 3가지정도 속성이 있는데 그 3가지가 미들웨어입니다.
//single ->  파일하나만 업로드할때 사용하는 미들웨어
const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'uploads/')// 1번째인자값:error , 2번째 인자값:디렉토리
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname) //originalname -> 상대방이 던져줄때 사용한 파일명 그대로 사용
            const filename = path.basename(file.originalname,ext) + Date.now() + ext
            done(null,filename) // 1번째인자값:error , 2번째 인자값:실제로저장할 파일명
        }
    }), //storage : 이미지 등을 내가 저장할 공간(하드디스크 등)

    limits:{ fileSize:5*1024*1024 }//파일용량 지정(5MB) limits는 선택사항
}) //객체 변환


app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true,
})

app.use((req,res,next)=>{
    req.ingoo = 'ingoo'
    next()
})

app.get('/single',(req,res)=>{
    console.log(req.ingoo)
    res.render('single')
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    console.log(req.file)
    console.log(req.body) //파일을 제외한 나머지 데이터도 받아올수있다.
    res.send('upload')
})

app.post('/upload2',upload.array('upload'),(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    res.send('upload')
})
//array : 여러파일전송

app.post('/upload3',upload.fields([{name:'upload1'},{name:'upload2'},{name:'upload3'}]),(req,res)=>{
    console.log(req.files.upload1)
    console.log(req.files.upload2)
    console.log(req.files.upload3)
    console.log(req.body)
    res.send('upload')
})

app.get('/axios',(req,res)=>{
    res.render('axios')
})

app.get('/array',(req,res)=>{
    res.render('array')
})

app.get('/uploads',(req,res)=>{
    res.render('uploads')
})

app.listen(3000,()=>{
    console.log('서버시작')
})