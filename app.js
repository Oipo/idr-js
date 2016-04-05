'use strict';

const bookshelf = require('./database/database');
const requireDir = require('require-dir');
const _ = require('lodash');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var createAllTables = async (dir => {
    const tables = requireDir('./database/tables');
    const sortedTables = _.sortBy(tables, table => table[0].order);
    _.forEach(sortedTables, table => {
        await (table[0].createTable(bookshelf.knex));
    });
});

var dropAllTables = async (dir => {
    const tables = requireDir('./database/tables');
    const sortedTables = _.sortBy(tables, table => -table[0].order);
    _.forEach(sortedTables, table => {
        await (bookshelf.knex.schema.dropTableIfExists(table[0].name));
    });
});

dropAllTables()
.then(() => createAllTables())
.then(() => {
    console.log('createTables');

    const Character = require('./database/tables/character')[0].Character;
    const User = require('./database/tables/user')[0].User;

    const user = new User({
        name: 'Oipo',
        password: 'haha'
    });

    user.save().then(u => {
        console.log(u.toJSON());

        const character = new Character({
            name: 'John Doe',
            gender: 'Male',
            user_id: u.id
        });

        return character.save();
    }).then(function(p) {
        console.log('User saved:', p.get('name'));

        User.where('id', 1).fetch({withRelated: ['characters']}).then(function(user) {
            console.log(user.toJSON());
        }).catch(function(err) {
            console.error(err);
        }).finally(function() {
            bookshelf.knex.destroy();
        });
    });
});
