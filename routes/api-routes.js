const todoList = require('../data/todo-list.js');
const sampleArray = require('../data/sample-array.json');

module.exports = function (app) {
    app.get('/api/todoList/', function (req, res) {
        res.json(todoList);
    })

    app.post('/api/todoList/',function(req, res){
        todoList.push(req.body);
        res.json(todoList);
    })
    
    app.put(`/api/todoList/`,function(req,res){
        const objectValue = Object.values(req.body);;
        console.log(objectValue);
        if(objectValue[1] !== ''){
        todoList.splice(objectValue[1],1,{what:objectValue[0]}); 
        res.json({success:true});
        }
    })
    app.delete('/api/todoList/', function (req, res) {
        const objectKey = Object.keys(req.body);
        todoList.splice(objectKey[0],1);
        res.json({ success:true });
    })
}