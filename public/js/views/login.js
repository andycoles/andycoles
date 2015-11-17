app.views.login = Backbone.View.extend({
  events: {
    "click #login": "login",
    "change input": "update"
  },
  template: _.template($("#login-form-tpl").html()),
  initialize: function() {
    var self = this;
    //_.bindAll(this, 'update');
    this.render();
  },
  render: function() {
    this.$el.html(this.template({}));
  },
  update: function() {
    this.model.set({
      username: this.$el.find('input[name=username]').val(),
      password: this.$el.find('input[name=password]').val(),
    });
    this.showUpdates();
  },
  showUpdates: function() {
    var username = this.model.get('username');
    var password = this.model.get('password');
    console.log("showUpdates - username: " + username + " - password: " + password);
  },
  login: function(event) {
    event.stopPropagation();
    event.preventDefault();

    var un = this.$el.find('input[name=username]').val();
    var pw = this.$el.find('input[name=password]').val();

    this.model.save({
      username: un,
      password: pw
    }, {
      error: function(model, res, opts) {console.log(res.message)},
      success: function(model, res, opts) {console.log(res.message + " user:" + res.user)}
    });

    console.log("login - username: " + un + " - password: " + pw);
  }
});
