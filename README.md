NOTE: This docs are aimed at the Spanish people as it's a node package which allows you to hit the public Royal Spanish Academy Dictionary.

[![Build Status](https://travis-ci.org/Tsur/node-rae.png)](https://travis-ci.org/Tsur/node-rae)

## Descripcion

node-rae es una pequeña librería mediante la cual puedes acceder al diccionario público que la Real Academia de la Lengua Española proporciona en su [website](http://www.rae.es/)

## Instalación

Puedes instalar node-rae tanto de forma local como de forma global

```bash
# Local
$ npm install rae
# Global
$ npm install -g rae
```

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

var Rae = require('rae');

// Promises are also available
Rae.search("repositorio", function(err, lemas) {

  if (err) {

    return console.error(err);

  }

  lemas.forEach(console.log);

});
```

## Tests

Para ejecutar los tests:

```bash
$ make test
# Or with npm
$ npm test
```