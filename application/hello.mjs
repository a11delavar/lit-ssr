import { LitElement, html } from 'lit'

class Hello extends LitElement {
	static properties = { name: { type: String } }

	render() {
		return html`
			<p @click=${() => console.log('Click')}>Hello ${this.name}!</p>

			<mo-flex direction='horizontal' gap='20px'>
				<span>One</span>
				<span>Two</span>
			</mo-flex>

			<mo-grid columns='2* *' gap='20px'>
				<span>One</span>
				<span>Two</span>
			</mo-grid>

			<mo-button disabled type='raised'>Hello ${this.name}!</mo-button>
		`
	}
}

customElements.define('app-hello', Hello)