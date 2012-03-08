var Backbone = require('backbone'),
    templates = require('handlebars').templates,
    _ = require('underscore');


exports.TaskView = Backbone.View.extend({
    tagName: 'tr',
    template: templates['task.html'],
    /*
    events: {
        'click .selected input': 'toggleDone'
    },
    */
    initialize: function () {
        this.model.bind('error', this.error, this);
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
    },
    error: function (err) {
        console.error(err);
    },
    render: function () {
        var el = this.el;
        $(el).html(
            this.template(_.extend(
                { due_pp: this.model.due_pp() },
                this.model.attributes
            ))
        );
        if (this.model.get('priority')) {
            $(el).addClass('priority' + this.model.get('priority'));
        }
        if (this.model.get('complete')) {
            $(el).addClass('complete');
        }
        if (this.model.overdue()) {
            $(el).addClass('overdue');
        }
        else if (this.model.due_today()) {
            $(el).addClass('today');
        }
        this.setText();
        this.$('.select input').change(function (ev) {
            if (this.checked) {
                $(el).addClass('selected');
            }
            else {
                $(el).removeClass('selected');
            }
        });
        return this;
    },
    setText: function () {
        var text = this.model.get('text');
        this.$('.todo-text').text(text);
    },
    toggleDone: function () {
        this.model.toggle();
    },
    remove: function () {
        $(this.el).remove();
    },
    clear: function () {
        this.model.destroy();
    }
});
