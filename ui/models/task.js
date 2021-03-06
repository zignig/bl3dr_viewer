var Backbone = require('backbone'),
    utils = require('../utils'),
    session = require('session');


exports.Task = Backbone.Model.extend({
    idAttribute: '_id',
    type: 'thing',
    defaults: function () {
        var username = session.userCtx ? session.userCtx.name: null;
        return {
            type: 'thing',
            complete: false,
            author: username,
            created_at: Date.today().toISOString(),
            tags: ['new']
        };
    },
    validate: function () {
        // TODO
        return null;
    },
    toggle: function () {
        this.save({complete: !this.get("complete")})
    },
    due_pp: function () {
        var due = this.get('due');
        if (due) {
            return utils.prettyPrintDate(new Date(due));
        }
        return '';
    },
    overdue: function () {
        var due = this.get('due');
        if (due) {
            return due < Date.today().toISOString();
        }
        return false;
    },
    due_today: function () {
        var due = this.get('due');
        if (due) {
            return (
                due >= Date.today().toISOString() &&
                due < Date.today().add({days: 1}).toISOString()
            );
        }
        return false;
    }
});
