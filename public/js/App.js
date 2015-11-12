var app = (function() {

  var api = {
    views: {},
    models: {},
    collections: {},
    content: null,
    router: null,
    init: function() {
      this.content = $("#content");
      ViewsFactory.login();
      Backbone.history.start();
      return this;
    },
    changeContent: function(el) {
      this.content.empty().append(el);
      return this;
    },
    title: function(str) {
      $("h1").text(str);
      return this;
    }
  };
  var ViewsFactory = {
    login: function() {
      if(!this.loginView) {
        var credModel = new api.models.credentials()
        this.loginView = new api.views.login({
          el: $("#content"),
          model: credModel
        });
      }
      return this.loginView;
    }
  };

  var Router = Backbone.Router.extend({});
  api.router = new Router();

  return api;

})();
