![](icon-in-progress.png)

<h1 style="text-align: center">Itti React Template</h1>

## ¿Qué es Itti React Template?

Es el template oficial construido con React basado en Hooks, Webpack y Typescript.

## Motivación

Nuestra motivación consiste en brindarles a los equipos de desarrollo herramientas sólidas y una arquitectura para construir **high-speed solutions** sin preocuparse del scaffolding, tooling, integración continua y despliegue continuo.

## Comunidad

Hecho con :heart: por el equipo de Arquitectura para la comunidad

## Tabla de contenidos:

- [Comenzar](#comenzar)
- [Tips y sugerencias](#tips-y-sugerencias)
- [Configuración](#configuración)
- [Theming](#theming)
  - [Usar el theme](#usar-el-theme)
- [Toolkit](#toolkit)
  - [Hooks HTTP](#hooks-http)
- [Mockeando un servicio](#mockeando-un-servicio)
  - [Qué es MSW?](qué-es-MSW?)
  - [Mockeando un server](#mockeando-un-server)
  - [Mockeando via Service Worker](#mockeando-via-service-worker)
- [CI / CD](#CI/CD)

## Comenzar 🚀

Seguí los siguientes pasos:

#### Clone repository ⬇️

TODO

#### Instalar dependencias 🔧

`yarn install`

#### Buildear la aplicación 🧱

`yarn build`

#### Correr la aplicación 🧱

`yarn dev`

#### Correr los test unitarios 👍

`yarn test:unit`

#### Correr los test de integracion 👍

`yarn test:integration`

#### Otros comandos para correr:

`yarn lint`

`yarn prettier`

## Configuracion NPM

configura un token en github y create un archivo .npmrc con el siguiten formato

```tsx
@ueno-tecnologia-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR-TOKEN>
```

## Tips y sugerencias

El Node Version Manager te va ayudar a organizar tus versiones de Node. Acá dejamos algunos links para instalarlo y como usarlo.

\* NVM (para <a href="https://github.com/coreybutler/nvm-windows" target="_blank" >Windows</a>, para <a href="https://github.com/nvm-sh/nvm" target="_blank" >Unix</a>). Tener instalado 16.x Node version

\* Tener instalado globalmente:

\* <a href="https://eslint.org/docs/user-guide/getting-started" target="_blank" >ESLint</a>

#### Usar una version de Node (solo si estas usando NVM) 🔧

`nvm use 16.X.X`

#### Sino no la tenes instalada:

`nvm install 16.x.x`

## Configuración

Como primera instancia, hay que agregar la variable de entorno BASE_PATH (/bo/remotes/template) seteando esta variable de entorno se va a setear el base path del router,webpack config y el ngnix.config, si tener necesidad de agregar otra configuracion de rutas adicional, tambien el soporte de nested route.

Este proyecto se basa en [Webpack 5](https://webpack.js.org/concepts/) y [SWC](https://github.com/swc-project/swc).

Una particularidad a tener en cuenta es que nosotros no definimos variables de entorno en un archivo `.env`. Lo que sugerimos es definirlas en archivos `.ts` en su lugar correspondiente.

Por ejemplo, si yo quisiera definir una variable con determinado valor en `local` debo hacer lo siguiente:

```tsx
// en config/local.ts

export default {
  foo: 'foo-local',
}
```

```tsx
// en config/index.ts

import defaultConfig from './default'

let config = { ...defaultConfig }

if (window.APP_ENV === 'local') {
  config = { ...config, ...require('./local.ts') }
}

// Mis otras configuraciones

export default config
```

Para usar un valor dado, acceder de la siguiente forma:

```tsx
import config from 'config'

const foo = config.foo
```

#### :exclamation:**RECOMENDACION**:exclamation:

Para entender como funciona en **Typescript** leer la siguiente [documentación](https://www.typescriptlang.org/docs/handbook/2/generics.html) y para entender como funciona **React con Typescript** **RECOMENDAMOS** este [link](https://react-typescript-cheatsheet.netlify.app/) :dizzy:

## Autenticación

WIP...
Tema que estamos analizando con el equipo de Accounts

## Routing

El template usa react-router-dom (react router para web) para manipular la url y brindar información sobre el **contexto de la aplicación** y saber en que dominio estoy parado. Para mas información mirar la documentación de [react-router-dom](https://reactrouter.com/web/guides/quick-start).

### Páginas del ABM

El backoffice posse 3 páginas fundamentales para su funcionamiento: `index.tsx`, `detail.tsx`, `list.tsx`.

A su vez estas son renderizadas en nuestros path's:

```tsx
// en routes.tsx

import Home from 'pages/index'
import List from 'pages/list'
import Detail from 'pages/detail'
import { appNameExport } from '../../constants'

const routes = [
  {
    path: `/${appNameExport}`,
    element: <Home />,
    errorElement: <p>Servicio No Disponible</p>,
  },
  {
    path: `/${appNameExport}/list`,
    element: <List />,
    errorElement: <p>Servicio No Disponible</p>,
  },
  {
    path: `/${appNameExport}/list/:id`,
    element: <Detail />,
    errorElement: <p>Servicio No Disponible</p>,
  },
]

export default routes
```

:gem: **TIP:** Como dijimos, el routing se basa en la implementación de react router para web (DOM), esta librería contiene varias utilidades basadas en hooks. Una de ellas y utilizada aquí es `useParams()` ([entre otros](https://css-tricks.com/the-hooks-of-react-router/)). Con este hook podremos acceder a los parametros de la ruta:

```tsx
// en detail.tsx

import React from 'react'
import { useParams } from 'react-router-dom'

const Detail = () => {
  const { resource, id } = useParams<{ resource: string, id: string }>()
  return (
  	<p>resource: {resource} </p>
    <p>id: {id} </p>
  )
}
```

## Theming

Este template usa el concepto de "theming" donde contiene toda la definición de nuestro diseño y concepto del producto.

### Usar el theme

:factory: En primer lugar debemos contar con un **theme** definido por el equipo de **UX** y debe tener la estructura de un objeto en javascript:

```tsx
// en theme/index.ts

const theme = {
  colors: ...,
  typography: ...,
  spacing: ...,
  sizes: ...,
  ....
}
```

Una vez teniendo el **theme** debemos pasarlo a traves de un Provider. En este caso, el provider de Styled Components:

```tsx
// en index.tsx

import { ThemeProvider } from 'styled-components'
import theme from 'theme'

const Root = () => (
  <ThemeProvider theme={theme}>// mis componentes</ThemeProvider>
)
```

Ahora nuestra aplicación quedó lista para que en nuestros styled-components / emotion puedan acceder via props a estos valores:

```tsx
// en styled.ts

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.red};
`
```

:rocket: Para darle más dinamismo a tus estilos mira la documentación de [emotion](https://emotion.sh/docs/styled) o [styled-components](https://styled-components.com/docs/advanced)

### Hooks HTTP

Abstracción de la capa HTTP basada en [axios hooks](https://www.npmjs.com/package/axios-hooks).

#### Uso

```tsx
import useRetrieveData from 'hooks/use-retrieve-data'
import MyEntity from 'interfaces/myEntity'

const List = () => {
  const { resource } = useParams<{ resource: string }>()
  const [{ data, error, loading }, execute] = useRetrieveData<MyEntity>({
    url,
    path: resource,
  })
}
```

## Mockeando un servicio

Para mockear servicios o para testear usamos MSW.

### Qué es MSW?

[Mock Service Worker]() es una libreria que trabaja en capa de red interceptando los request permitiendote responder como responderia el servicio que queres consumir si aun no esta listo para recibir request.

### Mockeando un server

Mockear un server lo vamos a necesitar para utilizarlo en el contexto de **Jest** cuando corre.

Lo primero que vamos hacer es definir nuestros **handlers** con algunas rutas de ejemplo:

```tsx
// en handlers.ts

import { rest } from 'msw'

export const handlers = [
  rest.post('/bff/login', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        firstName: 'Pablo',
        lastName: 'Sanchez',
      })
    )
  }),

  rest.get('/bff/posts', (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
          userId: '1',
          title: 'post 1',
          body: 'el body del post',
        },
      ])
    )
  }),
]
```

Luego en el test vamos a configurar nuestro server pasandole estos handlers:

```tsx
// en my-test.spec.tsx

import { setupServer } from 'msw/node'
import { handlers } from 'handlers'
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

afterEach(() => {
  server.resetHandlers()
})

// Tus Tests
```

Ahora con esta configuración, siempre que quieras testear un hook que contenga una llamada http o un componente en particular que haga el request, la configuración que brinda `msw/node` te permitirá no preocuparte en ello.

### Mockeando via Service Worker

MSW nos provee una api para poder mockear un servicio si este aun no esta listo para saber consumido.

Lo que debemos hacer es lo siguiente:

```tsx
// en mocks/index.ts

import { setupWorker } from 'msw'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

Nuestors handlers son los que vimos anteriormente [aqui](#mockeando-un-server).

Luego lo inicializaremos:

```tsx
import React from 'react'
import ReactDOM from 'react-dom'

// Si no queres mocks, modifica la condición para que no entre. Ej: 'foo'
function prepare() {
  if (process.env.APP_ENV === 'local') {
    const { worker } = require('./mocks')
    return worker.start()
  }
  return Promise.resolve()
}

const Root = () => (...)

// Espera que el service worker este enabled para runnear la aplicación con los mocks correspondientes
prepare().then(() => {
  ReactDOM.render(<Root />, document.getElementById('root'))
})

```

### CI/CD

Por favor tener en cuenta [esta documentacion](https://www.notion.so/How-to-use-Jenkins-Pipelines-in-your-projects-17ec879519f6447b92456c32cf7191e6) para la correcta configuracion de tu esquema de CI/CD.

### Configurando el proyecto como un microfronted

Lo primero que vamos hacer es buscar en VSCode o el ide de preferencia `my-project` y reemplazaremos por el nombre real. Alli nos aparecerá todos los archivos que debemos modificar.

**package.json**

```tsx
"name": "my-project",
```

**nginx.conf**

En el archivo de nginx.conf, reemplazar la variable {template} por el mismo valor utilizar en la contstante appNameExport en ./constants.ts

```tsx
    location ~ ^/{template}/health {
        default_type application/json;
        return 200 "{ status: ok }\n";
    }

    location ~ ^/bo/remotes/{template}(.*) {
        alias /usr/share/nginx/html;
        index index.html index.htm;
        try_files $1 /bo/remotes/{template}/index.html;
    }

    location = / {
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }
```

**sonar-project.properties**

```tsx
sonar.host.url=https://sonarcloud.io
sonar.projectKey=my-project
sonar.projectName=my-project
sonar.sources=src
sonar.exclusions=*.js, **/__tests__/**, **/__test__/**, **/*.spec.ts , **/mocks/**, src/config/**,
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

**config stg y prd**

Aqui vamos a configurar el public path una vez iniciada la aplicacion. Este valor sera reasignado a la variable global que crea Webpack llamada `__webpack_public_path__`. Esto se ve asi en el archivo `index.tsx`:

```tsx
import config from './config'

__webpack_public_path__ = config.basePath

import('bootstrap')
```

Luego en nuestros archivos `prd.ts` y `stg.ts` debemos colocar los valores:

```tsx
export default {
  basePath: 'https://backoffice-internal.stg.ueno.it/my-project',
  env: 'prd',
  menuBasePath: 'https://backoffice-internal.stg.ueno.it/header',
  remoteAppShellBasePath: 'https://backoffice-internal.stg.ueno.it/app-shell',
  api: {
    url: '/api',
    jwt: 'authorization',
  },
}
```

```tsx
export default {
  basePath: 'https://backoffice-internal.prd.ueno.it/my-project',
  env: 'prd',
  menuBasePath: 'https://backoffice-internal.prd.ueno.it/header',
  remoteAppShellBasePath: 'https://backoffice-internal.prd.ueno.it/app-shell',
  api: {
    url: '/api',
    jwt: 'authorization',
  },
}
```

Para determinar que archivo de configuración levantar, configuramos a traves del archivo `entrypoint.sh` que se ejecuta en el run, la siguiente variable global en nuestro `Window`:

```tsx
const htmlPlugin = new HtmlWebpackPlugin({
  templateContent: `
  <html>
    <head>
      <script>
        window.APP_ENV = ${!isProd ? "'local'" : 'REPLACE_APP_ENV'}
      </script>
      <title>
        ${process.env.WINDOW_NAME || 'App'}
      </title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`,
})
```
