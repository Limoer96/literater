var express = require('express');
var router = express.Router();
var db = require('./model');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/test', function (req, res, next) {
    res.render('test', {title: 'test', msg: ''})
});

// 接受用户连接

router.all('/handle', function (req, res, next) {

    let uname = req.body.username;
    let upasswd = req.body.userpassword;
    db.query('SELECT * from literater.users', (err, rows) => {
        if (err) {
            throw err;
        }
        var len = rows.length;
        // 一个完整的验证过程
        for (let i = 0; i < len; i++) {
            if (rows[i].userid === uname && rows[i].psd === upasswd) {
                res.cookie('user_id', rows[i].userid);
                res.cookie('user_psd', rows[i].psd);
                db.query('SELECT * FROM literater.borrow WHERE userid = ?', rows[i].userid, (err, data) => {
                        if (err) throw err;
                        console.log(rows.length);
                            res.render('user_index', {rows: data, uid: rows[i].userid});
                    }
                );
                break;
            }
            if (i === len - 1) {
                if (rows[i].userid !== uname || rows[i].psd !== upasswd) {
                    res.render('error_back');
                } else {
                    res.cookie('user_id', rows[i].userid);
                    res.cookie('user_psd', rows[i].psd);
                    db.query('SELECT * FROM literater.borrow WHERE userid = ?', rows[i].userid, (err, data) => {
                            if (err) throw err;
                            console.log(data.length);
                                res.render('user_index', {rows: data, uid: rows[i].userid});
                        }
                    );
                    break;
                }
            }
        }
    });
});
router.post('/search', (req, res) => {
    //console.log(req.body.title);
    db.query(`SELECT * FROM literater.files WHERE title LIKE "%${req.body.title}%" AND authority = 1 AND isrended = 1`, (err, rows) => {
        if (err) throw err;
        console.log('得到数据, 长度为:' + rows.length);
        res.send(rows);
        res.end();
    });
});


router.all('/register', (req, res, next) => {
    if (req.method === 'GET') {
        res.render('register', {title: '用户注册'});
    }
    else {
        db.query('INSERT INTO literater.users SET ?', req.body, (err, values) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log(values.affectedRows);
                res.redirect('/users/test');
            }
        })
    }
});

router.get('/:types/list', (req, res, next) => {
    db.query('SELECT * FROM literater.files WHERE type = ?', req.params.types, (err, rows) => {
        if (err) throw err;
        res.render('list_detail', {rows: rows})
    })
});

router.get('/:fid/:userid/borrow', (req, res, next) => {
    var userid = req.params.userid;
    var fid = req.params.fid;
    console.log(req.params);
    db.query('INSERT INTO literater.borrow set ?', req.params, (err, values) => {
        if (err) throw err;
        console.log(values.affectedRows);
    });
    db.query('UPDATE literater.files SET isrended = 0 WHERE fid = ?', fid, (err, values) => {
        if (err) throw err;
        console.log(values.affectedRows);
    });
    res.render('borrow_success_back', {uid: req.cookies.user_id, upsd: req.cookies.user_psd});

});

router.get('/:userid/:fid/return', (req, res) => {
    let uid = req.params.userid;
    let fid = req.params.fid;
    try {
        db.query(`DELETE FROM literater.borrow WHERE fid=${fid} AND userid = ?`, uid, (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows)
        });
        db.query('UPDATE literater.files SET isrended = 1 WHERE fid = ?', fid, (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows);
        });
    } catch (e) {
        console.log(e.message);
    }
    res.send({message: '归还成功!'});
    res.end();
});

router.get('/regs', (req, res) => {
    //取到查询的关键字
    //console.log(req.param('title'));
    db.query(`SELECT * FROM literater.files WHERE title LIKE "%${req.param('title')}%" AND authority = 1`, (err, rows) => {
        if (err) throw err;
        console.log('得到数据, 长度为:' + rows.length);
        res.render('reg_list', {rows: rows});
    });
});

module.exports = router;






