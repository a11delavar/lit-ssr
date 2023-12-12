import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import compress from 'koa-compress'
import { nodeResolve } from 'koa-node-resolve'
import { render, html } from '@lit-labs/ssr'
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js'
import { build } from 'esbuild'
import '../application/index.mjs'

await build({
	bundle: true,
	entryPoints: ['./application/index.mjs'],
	format: 'esm',
	outdir: './dist',
	sourcemap: 'inline',
})

const router = new Router

router.get('/:name?', ctx => {
	ctx.response.type = 'html'
	const { name } = ctx.params
	ctx.body = new RenderResultReadable(render(html`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>${name ?? 'There'}</title>
				<script type='module' src='../dist/index.js'></script>
			</head>
			<body>
				<app-hello name=${name ?? 'There'}></app-hello>
			</body>
		</html>
	`))
})

new Koa().use(logger())
	.use(bodyParser())
	.use(nodeResolve())
	.use(koaStatic('.'))
	.use(router.routes())
	.use(router.allowedMethods())
	.use(compress())
	.listen(8000, '0.0.0.0', () => console.log(`listening on http://localhost:8000...`))
