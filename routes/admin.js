/**
 * Created by limoer on 16/9/6.
 */
var express = require('express');
var  router = express.Router();
var db = require('./model');

router.post('/login', function (req, res, next) {
    if(req.body.adminname === 'limoer' && req.body.adminpassword === 'motao123'){
        db.query('SELECT * from literater.files', (err, rows) =>{
            //console.log(Date.parse(rows[0].expiretime));
            if(err) throw err;
            console.log(rows);
            res.render('admin_index',{name: req.body.adminname, rows: rows});
        });
        //res.render('admin_index',{name: req.body.adminname})
    }
});

router.all('/insert', (req, res, next) => {
    if(req.method.toLowerCase() === 'GET'.toLowerCase()){
        res.render('insert', {title: '入库页面'})
    }else if(req.method.toLowerCase() === 'post'.toLowerCase() && req.xhr) {
        console.log(req.body);

        db.query('INSERT INTO literater.files SET ?',req.body, (err, results) => {
            if(err) throw err;
            res.send({message: '插入数据成功'});
            res.end();

        });

    }
});
router.get('/:fid/destroy', (req, res, next) => {
    db.query('DELETE FROM literater.files WHERE fid=?',req.params.fid,(err, results) => {
         if(err) throw err;
         console.log(results.affectedRows);
         //res.render('destroy_success_back');
         res.send({message:'销毁数据成功'});
         res.end();
    });
});

module.exports = router;






