Alloy.Globals.Facebook.appid = Ti.App.Properties.getString('ti.facebook.appid');
Alloy.Globals.Facebook.permissions = ['publish_stream','email','user_birthday'];
Alloy.Globals.Facebook.forceDialogAuth = false;
Alloy.Globals.Facebook.addEventListener('login', function(e) {
  if (e.success) {
    var token, user;
    Alloy.Globals.Facebook.requestWithGraphPath('me',{},"GET",function(e) {
        if (e.success) {
          var obj = JSON.parse(e.result),
              moment = require('alloy/moment'),
              email, birthday;

          email = obj.email;
          birthday = moment(obj.birthday, "MM/DD/YYYY");
          token = Alloy.Globals.Facebook.accessToken;
          Ti.API.info("Success: " +
                      "email" + email +
                      "birthday" + birthday +
                      "token" + token
                     );
          user = Alloy.createModel('social');
          user.fbLogin(token,email, birthday);
        }
      }
    );

  } else if (e.error) {
    Ti.API.info(e.error);
  } else if (e.cancelled) {
    Ti.API.info("Canceled");
  }
});

$.icon.addEventListener('click', function(e) {
  Alloy.Globals.Facebook.authorize();
});

$.index.open();

