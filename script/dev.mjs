import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import compress from 'koa-compress'
import { nodeResolve } from 'koa-node-resolve'
import { render, } from '@lit-labs/ssr'
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js'
import { build } from 'esbuild'
import { html } from 'lit'
import '../application/index.mjs'

await build({
	bundle: true,
	entryPoints: ['./application/index.mjs'],
	format: 'esm',
	outdir: './dist',
	sourcemap: 'inline',
})

const router = new Router

router.get('/', ctx => {
	ctx.response.type = 'html'
	ctx.body = new RenderResultReadable(render(html`
		<html>
			<head>
				<meta charset='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Title</title>
				<script type='module' src='../dist/index.js'></script>
			</head>
			<body>
				<h1>Shopping list</h1>
				<app-hello name='World'></app-hello>
			</body>
		</html>
	`))
})

const port = process.env.PORT || 8000

new Koa().use(logger())
	.use(bodyParser())
	.use(nodeResolve())
	.use(koaStatic('.'))
	.use(router.routes())
	.use(router.allowedMethods())
	.use(compress())
	.listen(port, '0.0.0.0', () => console.log(`listening on http://localhost:${port}...`))
