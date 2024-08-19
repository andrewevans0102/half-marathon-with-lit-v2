import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('about-element')
export class AboutElement extends LitElement {
    @property({ type: String })
    titleValue = '';

    render() {
        return html`
            <article class="about-wrapper">
                <h1>${this.titleValue}</h1>
                <p>here is where we put the page about this application</p>
            </article>
            <img src="./HALF_MARATHON.jpg" />
            <button @click=${this._dispatchBackButtonClicked}>BACK</button>
        `;
    }

    // when clicked it dispatches an event to indicate back button is clicked
    private _dispatchBackButtonClicked() {
        this.dispatchEvent(new CustomEvent('backListener'));
    }

    static styles = css`
        button {
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            background-color: red;
            cursor: pointer;
            transition: border-color 0.25s;
            margin: 10px;
            width: 95%;
        }
        button:hover {
            border-color: #646cff;
        }
        button:focus,
        button:focus-visible {
            outline: 4px auto -webkit-focus-ring-color;
        }
        h1 {
            font-size: 48px;
        }
        img {
            width: 250px;
            border-radius: 40px;
            margin: 10px;
        }
        .about-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 10px;
        }
        p {
            text-align: left;
            max-width: 400px;
            font-size: 24px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'about-element': AboutElement;
    }
}
