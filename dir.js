const mainDir = __dirname;

console.log(module.paths);
const setName = function () {
    console.log('hehe');
};

setName();
exports.setName = setName;
