import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('main-element')
export class MainElement extends LitElement {
    @property({ type: String })
    clicked = '';

    render() {
        let display;
        // This basically is creating a SPA app, but a
        // router package could be used instead of
        // manually handling these transitions.
        // The point here was just demonstrating how events
        // can be passed between parent and children components.
        if (this.clicked === '') {
            display = html`<section>
                <div class="title">
                    <h1>Half Marathon Training with Lit</h1>
                </div>
                <div @click="${this._clickHandler}" class="main-body">
                    <button>Week</button>
                    <button>Month</button>
                    <button>Total Plan</button>
                    <button>Countdown Calculator</button>
                    <button>About</button>
                </div>
                <img src="./COVER.jpg" />
            </section>`;
        } else {
            if (this.clicked === 'Week') {
                display = html`<week-element
                    titleValue=${this.clicked}
                    @backListener=${this._clickBack}
                />`;
            } else if (this.clicked === 'Month') {
                display = html`<month-element
                    titleValue=${this.clicked}
                    @backListener=${this._clickBack}
                />`;
            } else if (this.clicked === 'Total Plan') {
                display = html`<total-element
                    titleValue=${this.clicked}
                    @backListener=${this._clickBack}
                />`;
            } else if (this.clicked === 'Countdown Calculator') {
                display = html`<countdown-calculator
                    titleValue=${this.clicked}
                    @backListener=${this._clickBack}
                />`;
            } else if (this.clicked === 'About') {
                display = html`<about-element
                    titleValue=${this.clicked}
                    @backListener=${this._clickBack}
                />`;
            }
        }
        return html`<main>${display}</main>`;
    }

    private _clickHandler(e: Event) {
        this.clicked =
            e.target === e.currentTarget
                ? 'container'
                : (e.target as HTMLDivElement).textContent!;
    }

    private _clickBack() {
        this.clicked = '';
    }

    static styles = css`
        div {
            display: flex;
            flex-direction: column;
        }
        :host {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
        }

        button {
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            background-color: #1a1a1a;
            cursor: pointer;
            transition: border-color 0.25s;
            margin: 10px;
            font-size: 24px;
        }
        button:hover {
            border-color: #646cff;
        }
        button:focus,
        button:focus-visible {
            outline: 4px auto -webkit-focus-ring-color;
        }
        h1 {
            width: 350px;
            word-wrap: true;
            text-align: center;
            font-size: 36px;
            color: green;
        }
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 200px;
            border-radius: 40px;
            margin: 20px;
        }
        .main-body {
            border-bottom: solid;
            padding: 50px;
        }

        @media (prefers-color-scheme: light) {
            a:hover {
                color: #747bff;
            }
            button {
                background-color: #f9f9f9;
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'main-element': MainElement;
    }
}
