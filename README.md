# narrow-cms-server

The server (Express) component for NarrowCMS. NarrowCMS is a light-weight content management system for MEAN stack developers.

## getting started

We have provided an example implementation of NarrowCMS that effectively is the information one needs to get started using it: https://github.com/larkintuckerllc/narrow-cms-example

## requirements

* MongoDB: Tested against v3.02
* Node.js: Tested against v0.12.3
* Express: Tested against v4.12.4
* Mongoose: Tested against v4.05

## reference

The following example exercises all the implementation features of NarrowCMS server.

```JavaScript
// IMPLEMENTING NARROW-CMS
var nc = require('narrow-cms-server');
nc.setDbPrefix('mycms'); // SETTING MONGO COLLECTION PREFIX - DEFAULT 'narrow-cms'
nc.setEncodeSecret('mysecret'); // SETTING SECRET USED TO ENCODE JSON WEB TOKEN - DEFAULT 'CHANGEME'
nc.setAdminPassword('mypassword'); // SETTING ADMIN ACCOUNT PASSWORD - DEFAULT 'CHANGEME'
nc.setStaticCacheAge(86400); // SETTING CACHE AGE FOR STATIC ITEMS - DEFAULT = 86400 = 1 DAY
nc.setContentCacheAge(300); // SETTING CACHE AGE FOR CONTENT ITEMS - DEFAULT = 300 = 5 MIN
app.use('/mycms', nc.getRouter()); // SETTING API ROOT URI
// NOTICE NO TRAILING SLASH IN ABOVE
```

NarrowCMS provides an administration application, available by browsing to the API root URI, to allow an administrator to manage the editables and users.

NarrowCMS provides an authentication API as well as RESTFul APIs used by the NarrowCMS client component.
