app.models.credentials = Backbone.Model.extend({

  defaults: {
    username: '',
    password: ''
  },

  url: app.API + '/auth/login',

  validate: function(attrs) {
    var un = attrs.username;
    var pw = attrs.password;
    if ((un === undefined || un == "") && (pw === undefined || pw == "")) {
      return 'Please provide a valid username & password';
    }
    if (un === undefined || un == "") {
      return 'Please provide a username';
    }
    if (pw === undefined || pw == "") {
      return 'Please provide a password';
    }
  }

});
