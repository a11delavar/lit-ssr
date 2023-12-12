import { LitElement, html } from 'lit'

class Hello extends LitElement {
	static properties = { name: { type: String } }

	render() {
		return html`
			<p @click=${() => console.log('Click')}>Hello ${this.name}!</p>
		`
	}
}

customElements.define('app-hello', Hello)