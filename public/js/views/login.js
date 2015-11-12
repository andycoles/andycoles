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

    console.log(this.model);

    var user = this.model.get('username');
    var pword = this.model.get('password');

    console.log("login - username: " + user + " - password: " + pword);
  }
});
