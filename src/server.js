import express  from 'express';
import React    from 'react';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import routes from './routes.js';
import util from 'util';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
const app = express();
const server  = require('http').createServer(app);
let nodemailer = require('nodemailer');
import { UserModel } from './models/userName';
import passport from 'passport';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/', express.static('public/assets'));
import axios from 'axios';

import redis from 'redis';
const redisClient = redis.createClient();

const config = require('../config');

app.post('/registration', (req, res) => {
  if (req.body.name && req.body.email) {
    let userData = {
      name: req.body.name,
      email: req.body.email
    };

    UserModel.create(userData, (err,  user) => {
      if (err) {
        return err;
      } else {
        return res.redirect('/profile');
      }
    })
  }
});

app.post('/api/sendUser', (req, res) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ershov.one@gmail.com',
      pass: config.pass
    }
  });
  const mailOptions = {
    from: 'ershov.one@gmail.com',
    to: 'andrei.ershov@global-finance.pro',
    subject: 'Новый пользователь',
    html: `
        <div>
          <p>Имя соискателя: ${req.body.name}</p>
          <p>Электронный адрес: ${req.body.email}</p>
          <p>Текст: ${req.body.text}</p>
        </div>
      `
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      
      console.error(error);
      return res.status(500).send('error');
    }
    return res.status(200).send('done');
  });
});

app.use((req, res) => {
  return renderHTML(req, res);
});

const cssUrl = process.env.NODE_ENV !== 'production' ? `http://${config.ip}:3003/styles.css` : `/${webpackAssets.main.css}`;
const jsUrl = process.env.NODE_ENV !== 'production' ? `http://${config.ip}:3003/bundle.js` : `/${webpackAssets.main.js}`;

function renderHTML(req, res, data) {
  const context = { data };
  const componentHTML = renderToString(
    <StaticRouter location={req.url} context={context}>
    {renderRoutes(routes)}
    </StaticRouter>
);

  let preloadedState = '';

  if (!data) {
    preloadedState = '';
  } else {
    preloadedState = `window.__PRELOADED_STATE__ = ${JSON.stringify(data).replace(/</g, '\\u003c')};`;
  }
  return res.status(context.status ? context.status : 200).send(`
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta
          name="viewport"
          content="width=1250, initial-scale=1.0, maximum-scale=1.0"
        />
        <script>
          ${preloadedState}
        </script>
        <meta name="theme-color" content="#ffffff">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <link rel="stylesheet" href=${cssUrl}>
        <script type="application/javascript" src=${jsUrl}></script>
      </body>
    </html>
  `);
}

server.listen(3001, () => {
  console.log(`Server listening on: 3001 ${new Date()}`);
});
