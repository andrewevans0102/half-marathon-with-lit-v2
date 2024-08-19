import { format } from 'date-fns';
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('countdown-calculator')
export class CountdownCalculator extends LitElement {
    @property({ type: String }) titleValue = '';
    @property({ type: String }) selectedOption: string = 'days';
    // race day is 11/16/24
    @property({ type: String }) targetDate: string = '2024-11-16T00:00:00Z';

    @state()
    private _message = 'until RACE DAY';

    static styles = css`
        .container {
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
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
            margin-top: 50px;
            width: 95%;
        }
        select {
            margin-top: 10px;
            padding: 5px;
            font-size: 16px;
        }
        .result {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
    `;

    calculateTimeLeft(): string {
        const targetDateTime = new Date(this.targetDate).getTime();
        const now = new Date().getTime();
        const timeDifference = targetDateTime - now;

        if (this.selectedOption === 'days') {
            const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return `${daysLeft} ${this.selectedOption} ${this._message}`;
        } else if (this.selectedOption === 'weeks') {
            const weeksLeft = Math.floor(
                timeDifference / (1000 * 60 * 60 * 24 * 7)
            );
            return `${weeksLeft} ${this.selectedOption} ${this._message}`;
        } else if (this.selectedOption === 'hours') {
            const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
            return `${hoursLeft} ${this.selectedOption} ${this._message}`;
        }
        return '';
    }

    handleChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        this.selectedOption = selectElement.value;
    }

    // when clicked it dispatches an event to indicate back button is clicked
    private _dispatchBackButtonClicked() {
        this.dispatchEvent(new CustomEvent('backListener'));
    }

    render() {
        return html`
            <div class="container">
                <h1>${this.titleValue}</h1>
                <p>Race Day is ${format(this.targetDate, 'MM-dd-yyyy')}</p>
                <select @change="${this.handleChange}">
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="hours">Hours</option>
                </select>
                <div class="result">${this.calculateTimeLeft()}</div>
                <button @click=${this._dispatchBackButtonClicked}>BACK</button>
            </div>
        `;
    }
}
