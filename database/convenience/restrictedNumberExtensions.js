const extensions = {};

extensions.restrictedNumberColumns = function(table, columnName) {
    table.integer(columnName + '_minimum');
    table.integer(columnName + '_maximum');
    table.integer(columnName + '_current');
};

extensions.playerStat = ['minimum', 'maximum', 'current'];

module.exports = extensions;
