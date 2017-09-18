const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/everyday');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect to mongodb successfully!');
});

const Schema = mongoose.Schema;
const personSchema = new Schema({
    name: String,
    personId: String,
    personPass: String,
    achieved: [{content: String, date: String}]
}, {collection: 'persons'});

const groupSchema = new Schema({
    name: String,
    introduce: String,
    members: [{personId: String, name: String}]
}, {collection: 'groups'});

personSchema.statics.addAchieved = function(personId, newA) {
    this.findOne({personId: personId}, 'achieved', (err, person) => {
        if (err) {
            console.log('fuck error!!');
        } else {
            console.log(person);
        }
    });
};

const Group = mongoose.model('Group', groupSchema);

const Person = mongoose.model('Person', personSchema);

/**
 * 
 * @param {Object} user - the object contains person's id and pass
 * @param {Function} fn - callback function  has an param as error
 */
const checkLogin = (user, fn) => {
    Person.findOne({personId: user.id}, 'personPass name', (err, person) => {
        if (err) {
            console.log('find person error!!');
            fn(err);
        } else {
            if (person && (person.personPass === user.pass)) {
                fn(null, person.name);
            } else {
                fn(null);
            }
        }
    });
};

/**
 * 
 * @param {Object} newP - {name: String, id: String, pass: String}
 * @param {Function} callback
 */
const createPerson = (newP, callback) => {
    const person = new Person({
        name: newP.name,
        personId: newP.id,
        personPass: newP.pass
    });

    person.save((err) => {
        if (err) {
            console.log('create person error!!');
            callback(err);
        }
    });

    callback();
};

/**
 * 
 * @param {String} name - the name of group  
 * @param {String} introduce - the introduce of group
 */
const createGroup = (name, introduce) => {
    const group = new Group({
        name: name,
        introduce: introduce,
        members: []
    });

    group.save((err) => {
        if (err) {
            console.log('create group error');
        }
    });
};

/**
 * 
 * @param {Function} fn - callback to deal with data
 */
const getGroups = (fn) => {
    Group.find({}, 'introduce name', (err, groups) => {
        if (err) {
            console.log('get groups error!!');
        } else {
            fn(groups);
        }
    });
};

/**
 * 
 * @param {String} groupName - the name of group to query
 * @param {Function} callback - callback has a param members
 */
const getMembers = (groupName, callback) => {
    Group.findOne({name: groupName}, 'members', (err, group) => {
        if (err) {
            console.log('get group error');
        } else {
            callback(group.members);
        }
    });
};

/**
 * 
 * @param {String} personId - personId of one people to query
 * @param {Function} callback - function to call (pass person.achieved to it as a param)
 */
const getAchieved = (personId, callback) => {
    Person.findOne({personId: personId}, 'achieved name', (err, person) => {
        if (err) {
            console.log('get achieved error!!');
        } else {
            const achieved = person.achieved;
            const name = person.name;    
            callback({achieved, name});
        }
    }); 
};

/**
 * 
 * @param {String} groupName - the name of group to query
 * @param {Object} person - an object contains the id and name of joined person
 */
const insertMember = (groupName, person) => {
    Group.update({name: groupName}, {$push: {members: {personId: person.personId, name: person.name}}}, (err, raw) => {
        if (err) {
            console.log('insert member error');
        }
    });
};

/**
 * 
 * @param {String} groupName - the name of group to mutate
 * @param {String} person - the id of dropped person
 */
const dropMember = (groupName, personId) => {
    Group.update({name: groupName}, {$pull: {members: {personId: personId}}}, (err, raw) => {
        if (err) {
            console.log('drop member error');
        }
    });
};

/**
 * 
 * @param {String} personId heihei
 * @param {object} newA - {content: String, date: String (maybe Date)}
 */
const insertAchieved = (personId, newA) => {
    Person.update({personId: personId}, {$push: {achieved: newA}}, (err, raw) => {
        if (err) {
            console.log('insert achieved error');
        } 
    });
};

/**
 * 
 * @param {String} groupName - the name of group
 * @param {String} personId - personId 
 */
const isInGrounp = (groupName, personId, cb) => {
    Group.findOne({name: groupName, members: {$elemMatch: {personId: personId}}}, (err, user) => {
        if (err) {
            console.log('isInGroup Error');
            return false;
        }

        if (user) {
            cb('true');
        } else {
            cb('false');
        }
    });
};

const delGroup = (groupName) => {
    Group.remove({ name: groupName }, function (err) {
        if (err) {
            console.log('delGroup error');
        }
    });
};

// Group.update({'name': 'front end', 'members.personId': '15079002208'}, {'$set': {
//     'members.$.name': 'wanfengxiang'
// }}, (err) => {
//     if (err) {
//         console.log('some err');
//     } else
//         console.log('success');
// });

// Group.find(function (err, results) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });

exports.checkLogin = checkLogin;
exports.createPerson = createPerson;
exports.createGroup = createGroup;
exports.getGroups = getGroups;
exports.insertAchieved = insertAchieved;
exports.insertMember = insertMember;
exports.getAchieved = getAchieved;
exports.getMembers = getMembers;
exports.isInGrounp = isInGrounp;
exports.dropMember = dropMember;
exports.delGroup = delGroup;

