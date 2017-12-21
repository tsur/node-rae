
[![Build Status](https://travis-ci.org/tsur/node-rae.png)](https://travis-ci.org/tsur/node-rae)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Coverage Status](https://coveralls.io/repos/github/Tsur/node-rae/badge.svg?branch=inestable)](https://coveralls.io/github/Tsur/node-rae?branch=inestable)

## Descripción

**NOTE:** Access English Docs [Here](docs/en/README.md)

Rae es una pequeña librería mediante la cual puedes acceder al diccionario público que la Real Academia de la Lengua Española proporciona en su [website oficial](http://www.rae.es/). Demo [aquí](https://tsur.github.io/node-rae).

## Instalación

[![NPM](https://nodei.co/npm/rae.png)](https://nodei.co/npm/rae/)

Puedes instalar node-rae tanto de forma local como de forma global

```bash
# Local
$ npm install rae
# Global
$ npm install -g rae
```

![Example1](docs/examples/rae.gif?raw=true)

## Uso

Si has realizado la instalación global, simplemente ejecuta rae en la consola para ver la ayuda en línea. Un ejemplo básico es el siguiente:

```bash
$ rae repositorio
```

Lo cual muestra por pantalla:

```bash
Etimologia:  (Del lat. repositorĭum, armario, alacena).
 1. m. Lugar donde se guarda algo.
```

También puedes utilizar la libería rae en tus propios proyectos. Más ejemplos disponibles en el directorio examples.

```js
import Rae from 'rae';

const raeClient = Rae.create();

raeClient.search("repositorio").then((match) => ...);
```

## Tests

Para ejecutar los tests:

```bash
$ npm test
```