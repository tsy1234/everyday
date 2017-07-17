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
    members: [{personId: String}]
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
        members: [{personId: '15079002208'}]
    });

    group.save((err) => {
        if (err) {
            console.log('create group error');
        }
    });
};

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
    Person.findOne({personId: personId}, 'achieved', (err, person) => {
        if (err) {
            console.log('get achieved error!!');
        } else {    
            callback(person.achieved);
        }
    }); 
};

/**
 * 
 * @param {String} groupName - the name of group to query
 * @param {String} id - the personId of joining person
 */
const insertMember = (groupName, id) => {
    Group.update({name: groupName}, {$push: {members: {personId: id}}}, (err, raw) => {
        if (err) {
            console.log('insert member error');
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
            console.log('insert error');
        } 
    });
};

exports.checkLogin = checkLogin;
exports.createPerson = createPerson;
exports.createGroup = createGroup;
exports.getGroups = getGroups;
exports.insertAchieved = insertAchieved;
exports.insertMember = insertMember;
exports.getAchieved = getAchieved;
exports.getMembers = getMembers;


