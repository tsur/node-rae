
[![Build Status](https://travis-ci.org/Tsur/node-rae.png)](https://travis-ci.org/Tsur/node-rae)
[![MIT License](https://img.shields.io/npm/l/es6-lib-template.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Coverage Status](https://coveralls.io/repos/github/Tsur/node-rae/badge.svg?branch=inestable)](https://coveralls.io/github/Tsur/node-rae?branch=inestable)

## Description

Rae provides a tiny library to access the well-known spanish RAE dictionary programatically. It exposes an easy API for fetching words and a commnad line utility for looking up words in the [official RAE dictionary](http://www.rae.es/). Access the demo site [here](https://tsur.github.io/rae)

## Setup

[![NPM](https://nodei.co/npm/rae.png)](https://nodei.co/npm/rae/)

Rae requires node in order to work. Please, download and install it from [node website](https://nodejs.org/)

Then, open a terminal session and type:

```bash
# Local Setup
$ npm install rae
# Global Setup
$ npm install --global rae
```

## Command line

For using the command line interface utility, just exec the rae process passing in the word as first parameter. A basci example is shown below.

```bash
$ rae repositorio
```

It will display the definition for the "repositorio"(repository in english) word.

```bash
Etimologia:  (Del lat. repositorĭum, armario, alacena).
 1. m. Lugar donde se guarda algo.
```

## Using in your own project

In order to use Rae in your personal project, you first need to import it. Rae exports a RaeClient which is a factory you can use to instantiate Rae clients. By default, it uses an HTTP Rae client. All clients have a search function to which you just need to pass in the word looking up for. Check the example below.

```js
import Rae from 'rae';

const raeClient = Rae.create();

raeClient.search("repositorio").then((match) => ...);
```

## Contributing

Feel free to raise a PR either for fixing bugs and implementing new features. You can also help by increasing the test cases or documenting the project. All help is welcome.

Just make sure `npm run validate` works before submitting your PR! 