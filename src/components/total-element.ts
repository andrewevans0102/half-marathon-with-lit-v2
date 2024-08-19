import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('total-element')
class TotalElement extends LitElement {
    @property({ type: Array }) weeks = [];

    static styles = css`
        :host {
            display: block;
            font-family: Arial, sans-serif;
            padding: 16px;
        }

        ul {
            padding: 0;
            margin: 0 0 20px 0;
            text-align: left;
        }

        li {
            width: 180px;
            color: white;
        }

        .week {
            opacity: 0;
            padding: 10px;
            transition: opacity 0.5s ease-in;
            border: solid;
            width: 250px;
            border-radius: 20px;
            margin: 10px;
        }

        .week.visible {
            opacity: 1;
        }

        .wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p {
            max-width: 200px;
            text-align: center;
            margin: 0;
        }

        .month-heading {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 20px;
        }

        h5 {
            color: green;
            font-size: 18px;
            margin: 0 0 10px 0;
            padding: 0;
        }

        h4 {
            font-size: 24px;
            margin: 0 0 10px 0;
            padding: 0;
            color: pink;
            width: 100%;
        }

        h3 {
            font-size: 36px;
            margin: 0 0 10px 0;
            padding: 0;
            border-bottom: solid;
            width: 100%;
        }
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
    `;

    firstUpdated() {
        const weekElements = this.shadowRoot!.querySelectorAll('.week');
        weekElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 500);
        });
    }

    render() {
        return html`
            <div>
                <h3>Weekly Structure</h3>
                <article class="wrapper">
                    <ul>
                        <li>5 Days of Running</li>
                        <li>1 Long Run</li>
                        <li>1 Tempo Run or Interval Training</li>
                        <li>3 Easy Runs</li>
                        <li>2 Rest Days</li>
                    </ul>
                </article>
                ${this.renderMonth('July - August', 'Building Base Mileage', [
                    {
                        week: 'Week 1',
                        days: [
                            'Mon: Rest',
                            'Tue: 2 miles easy',
                            'Wed: 2 miles easy',
                            'Thu: Rest',
                            'Fri: 2 miles easy',
                            'Sat: 3 miles easy',
                            'Sun: Rest',
                        ],
                    },
                    {
                        week: 'Week 2',
                        days: [
                            'Mon: Rest',
                            'Tue: 2.5 miles easy',
                            'Wed: 2.5 miles easy',
                            'Thu: Rest',
                            'Fri: 2.5 miles easy',
                            'Sat: 3.5 miles easy',
                            'Sun: Rest',
                        ],
                    },
                    {
                        week: 'Week 3',
                        days: [
                            'Mon: Rest',
                            'Tue: 3 miles easy',
                            'Wed: 3 miles easy',
                            'Thu: Rest',
                            'Fri: 3 miles easy',
                            'Sat: 4 miles easy',
                            'Sun: Rest',
                        ],
                    },
                    {
                        week: 'Week 4',
                        days: [
                            'Mon: Rest',
                            'Tue: 3 miles easy',
                            'Wed: 3 miles easy',
                            'Thu: Rest',
                            'Fri: 3 miles easy',
                            'Sat: 4 miles easy',
                            'Sun: Rest',
                        ],
                    },
                ])}
            </div>
            <button @click=${this._dispatchBackButtonClicked}>BACK</button>
        `;
    }

    renderMonth(
        month: string,
        focus: string,
        weeks: { week: string; days: string[] }[]
    ) {
        return html`
            <article class="month-heading">
                <h4>${month.toUpperCase()}</h4>
                <p>${focus}</p>
            </article>
            ${weeks.map(
                (week) => html`
                    <article class="week">
                        <h5>${week.week}</h5>
                        <div class="wrapper">
                            <ul>
                                ${week.days.map((day) => html`<li>${day}</li>`)}
                            </ul>
                        </div>
                    </article>
                `
            )}
        `;
    }

    // when clicked it dispatches an event to indicate back button is clicked
    private _dispatchBackButtonClicked() {
        this.dispatchEvent(new CustomEvent('backListener'));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'total-element': TotalElement;
    }
}
