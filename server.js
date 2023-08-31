const express = require('express')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))

//初始化一个用于保存人的数组
let personArr = [
	{id:1,name:'kobe',age:18},
	{id:2,name:'wade',age:19},
]

//获取所有人信息-----无需参数
app.get('/get_persons',(req,res)=>{
	res.send({status:1,data:personArr.sort()})
})

//根据id获取一个人的信息---- 参数：id ------参数类型：query参数
app.get('/get_person_byid',(req,res)=>{
	const {id} = req.query
	if(!id) {
		res.send({status:0,msg:'id不能为空'})
		return
	}
	console.log(id);
	npersonArr = personArr.filter((item)=>{
		return item.id === id*1
	})
	res.send({status:1,data:npersonArr[0]})
})

//添加一个人-----参数：name,age	-----参数类型：请求体参数
app.post('/person',(req,res)=>{
	const {name,age} = req.body
	if(!name || !age){
		res.send({status:1,msg:'添加失败，名字和年龄均不能为空'})
		return
	}
	personArr.push({id:personArr.length+1,name,age:age*1})
	res.send({status:1,data:personArr.reverse()[0]})
})

//更新一个人-----参数：id,name,age-----参数类型：请求体参数
app.put('/person',(req,res)=>{
	const {id,name,age} = req.body
	let person = personArr.find((item)=>{return item.id === id*1})
	if(person){
		person.name = name
		person.age = age
		res.send({status:1,data:person})
	}else{
		res.send({status:0,data:'更新出错，未找到对应id'})
	}
})

//删除一个人-----参数：id-----参数类型：params参数
app.delete('/person/:id',(req,res)=>{
	const {id} = req.params
	nPersonArr = personArr.filter((item)=>{
		return item.id !== id*1
	})
	if(nPersonArr.length !== personArr.length ){
		personArr = nPersonArr
		res.send({status:1,data:'删除成功'})
	}else{
		res.send({status:0,data:'删除失败'})
	}
})

// 测试js对象(axios自动解析成js对象)
app.get('/user',(req,res) =>{
	res.send({name:'张三',age:14})
})

// 测试json串(axios自动解析成js对象)
app.get('/test',(req,res) =>{
	 res.send({"name":"张三","age":14})
	// res.send('<h1>你好</h1>')
})

app.listen(3000,(err)=>{
	if(!err) {
		console.log('测试axios页面为：http://localhost:3000/axios01.html');
		console.log('测试axios页面为：http://localhost:3000/axios7.html');
		console.log('测试axios页面为：http://localhost:3000/axios.html');
		console.log('测试axios页面为：http://localhost:3000/axios基本使用.html');
		console.log('测试axios页面为：http://localhost:3000/axios_await.html');
		console.log('测试axios页面为：http://localhost:3000/axios.create.html');
		console.log('测试axios页面为：http://localhost:3000/wztest.html');
		console.log('测试axios页面为：http://localhost:3000/wzTest.html');
		console.log('测试axios页面为：http://localhost:3000/axios10.html');
	}
	else console.log(err);
})