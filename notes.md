# issue rendering css from pug:

**background:**
no node template generator.

**problem:**
css not loading from layout.pug in /views
/css or changing to /stylesheets must be included by our app like so:
```js
// server.js
app.use(express.static(path.join(__dirname, 'css')));
// or
app.use(express.static(path.join(__dirname, 'stylesheets')));
```

since we are using this static path;
```html
link(rel='stylesheet' type="text/css" href='./style.css')
```
or
```html
link(rel='stylesheet' type="text/css" href='./index.css')
```

We call it like so.

Since we are doing `app.use(./stylesheets)` in server.js we can href `./index.css` as those files are in 'use' by our app, instead of href `../stylesheets/index.css` in our layout.pug


# @import url() in css has to be at the top of the file

this works:
```css
@import url('./sign-up.css');

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}
```

this does NOT work:
```css
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

@import url('./sign-up.css');
```


# using POST body in 2022:

```js
// in index.js / server.js
app.use(express.urlencoded({ extended: false }));
```


# validation in another file:

- middlewear that exists after the `/post` request has been made, but before the post function itself runs.

`/validators/sign-up.js`
```js
const { body, check, validationResult } = require('express-validator');

exports.validateSignUp = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username can not be empty!')
    .bail()
    .isLength({ min: 1, max: 16 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('password')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Password can not be empty')
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage('Password must be a minimum of 6 characters')
    .bail(),
  check('repassword')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('re entered password must not be empty')
    .bail()
    .custom((repassword, { req }) => {
      if (repassword === req.body.password) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('passwords must match')
    .bail(),
  (req, res, next) => {
    next();
  },
];
```
`/routes/sign-up.js`
```js
const { validateSignUp } = require('../validators/sign-up.js');

signupRouter.get('/', (req, res, next) => {
  res.render('sign-up');
});

signupRouter.post('/', validateSignUp, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('sign-up', {
      username: req.body.username,
      password: req.body.password,
      repassword: req.body.password,
      errors: errors.array(),
    });
  }
  res.redirect('/sign-up');
});
```


# pug includes:

`includes` 'component' the component should not have `block content` or `extends layout`

layout.pug
```html
doctype html
html
    head
      meta(charset='UTF-8')
      meta(name='viewport' content='width=device-width, initial-scale=1.0')
      meta(http-equiv='X-UA-Compatible' content='ie=edge')
      title= title
      link(rel='stylesheet' type="text/css" href='./index.css')
    body
      include nav.pug
      block content
      include footer.pug
```
nav.pug
```html
div(class='nav-container') Nav
```



# all passport boilerplate and functionality.

code goes AFTER APP but BEFORE VIEWS see /server.js for more info

```js
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password).then((result) => {
        console.log(result);
        if (result) {
          return done(null, user);
        }
        return done(null, false);
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
```

- `new localStrategy` making use of `bcrypt.compare` requires bcrypt.compare to use `.then()` as it returns a promise.