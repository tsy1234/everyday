const express = require('express');
const router = express.Router();

const back = require('./back/back');

router.post('/checklogin', (req, res) => {
    var o = {
        id: req.body.id,
        pass: req.body.pass
    };

    back.checkLogin(o, (err, name) => {
        if (err) {
            res.status('500').send('back end error');
        } else if (!name) {
            res.redirect('/login');
        } else {
            res.cookie('userId', o.id);
            res.cookie('userName', name);
            res.redirect('/index');
        }
    });
});

router.get('/getmy', (req, res) => {
    const id = req.cookies.userId;
    back.getAchieved(id, (achieved) => {
        res.send(achieved);
    });
});

router.get('/getone/:personId', (req, res) => {
    const id = req.params.personId;
    back.getAchieved(id, (achieved) => {
        res.send(achieved);
    });
});

router.get('/getgroups', (req, res) => {
    back.getGroups((groups) => {
        res.send(groups);
    });
});

router.get('/getmembers/:groupName', (req, res) => {
    const groupName = req.params.groupName.replace('_', ' ');
    back.getMembers(groupName, (members) => {
        res.send(members);
    });
});

router.post('/addachieved', (req, res) => {
    const content = req.body.content;
    const now = new Date();
    const date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
    const o = {
        content: content,
        date: date
    };
    back.insertAchieved(req.cookies.user, o);
});

module.exports = router;
