## issue rendering css from pug:

**background:**
writing the entire app by hand, no node template generator.

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

Since we are doing `app.use(./stylesheets)` we can href `./index.css`
instead of href `../stylesheets/index.css`
in our layout.pug


## @import url() in css has to be at the top of the file

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