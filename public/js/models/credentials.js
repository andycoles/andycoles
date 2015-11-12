app.models.credentials = Backbone.Model.extend({

  defaults: {
    username: '',
    password: ''
  },

  validate: function(attrs) {
    if (attrs.username === undefined) {
      return 'You must enter a username';
    }
  },

  initialize: function() {
    console.log('The credentials model has been initialized');

    this.on('change:username', function() {
      console.log('model - username values for this model have changed');
    });

    this.on('invalid', function(model, error) {
      console.log(error);
    });
  }

});
