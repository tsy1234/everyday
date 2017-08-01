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
            res.status(500).send('back end error');
        } else if (!name) {
            res.redirect('/login');
        } else {
            res.cookie('userId', o.id);
            res.cookie('userName', name);
            res.redirect('/index');
        }
    });
});

router.post('/register', (req, res) => {
    const name = req.body.username;
    const id = req.body.userid;
    const pass = req.body.pass;

    back.createPerson({name, id, pass}, (err) => {
        if (err) {
            res.status(500).send('back end error');
        } else {
            res.cookie('userId', id);
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

router.post('/creategroup', (req, res) => {
    const name = req.body.name;
    const introduce = req.body.introduce;

    back.createGroup(name, introduce);
});

router.get('/getmembers/:groupName', (req, res) => {
    const groupName = req.params.groupName.replace('_', ' ');
    back.getMembers(groupName, (members) => {
        res.send(members);
    });
});

router.post('/addachieved', (req, res) => {
    const content = req.body.content;
    const date = req.body.date;

    const o = {
        content: content,
        date: date
    };
    
    back.insertAchieved(req.cookies.userId, o);
});

router.post('/joingroup', (req, res) => {
    const personId = req.cookies.userId;
    const name = req.cookies.userName;

    const groupName = req.body.groupName;

    back.insertMember(groupName, {personId, name});
});

router.post('/isingroup', (req, res) => {
    const personName = req.cookies.userName;
    const personId = req.cookies.userId;
    const groupName = req.body.groupName;

    back.isInGrounp(groupName, personId, (para) => {
        const isIn = (para === 'false') ? false : true;

        const result = {
            isIn,
            personId,
            personName
        };
        res.end(JSON.stringify(result));
    });
});

module.exports = router;
