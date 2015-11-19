app.views.login = Backbone.View.extend({
  events: {
    "click #login": "login",
    "change input": "update"
  },
  template: _.template($("#login-form-tpl").html()),
  initialize: function() {
    var self = this;
    this.render();
  },
  render: function() {
    this.$el.html(this.template({}));
  },
  update: function() {
    this.model.set({
      username: this.$el.find('input[name=username]').val(),
      password: this.$el.find('input[name=password]').val()
    });
  },
  login: function(event) {
    event.stopPropagation();
    event.preventDefault();

    this.update();

    if (this.model.isValid()) {

      this.model.save({
        username: this.model.get('username'),
        password: this.model.get('password')
      }, {
        error: function(model, res, opts) {console.log(res)},
        success: function(model, res, opts) {console.log(res)}
      });

      console.log("login - username: " + this.model.get('username') + " - password: " + this.model.get('password'));

    } else {
      console.log(this.model.validationError);
    }
  }
});
