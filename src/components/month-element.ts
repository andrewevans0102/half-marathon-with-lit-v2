import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { format, isThisMonth } from 'date-fns';
import { Task } from '@lit/task';
import { animate, fadeInSlow } from '@lit-labs/motion';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('month-element')
export class MonthElement extends LitElement {
    @property({ type: String })
    titleValue = '';

    private _planTask = new Task(this, {
        task: async ([], { signal }) => {
            const response = await fetch(`./TRAINING_PLAN.json`, {
                signal,
            });
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        },
        args: () => [],
    });

    render() {
        return this._planTask.render({
            pending: () => html`<p>Loading plan...</p>`,
            complete: (overallResponse) => {
                // find page value for this month
                // const pageValue = overallResponse.filter((value: any) => {
                //     return isThisMonth(new Date(value.startDate));
                // });
                // for sample just always showing the same month
                const pageValue = overallResponse;
                console.log(pageValue);

                if (pageValue !== undefined) {
                    return html`
                        <h1>${this.titleValue}</h1>
                        ${pageValue.map(
                            (week: any) => html` <div
                                class="week"
                                ${animate({
                                    in: fadeInSlow,
                                })}
                            >
                                <h3>${week.week} of 16</h3>
                                <h4>
                                    starting
                                    ${format(week.startDate, 'MM-dd-yyyy')}
                                </h4>
                                <div class="schedule">
                                    ${week.schedule.map(
                                        (day: any) => html`
                                            <div
                                                class="day"
                                                ${animate({
                                                    in: fadeInSlow,
                                                })}
                                            >
                                                ${day.day}: ${day.activity}
                                            </div>
                                        `
                                    )}
                                </div>
                            </div>`
                        )}
                        <button @click=${this._dispatchBackButtonClicked}>
                            BACK
                        </button>
                    `;
                }
            },
            error: (e) => html`<p>Error: ${e}</p>`,
        });
    }

    // when clicked it dispatches an event to indicate back button is clicked
    private _dispatchBackButtonClicked() {
        this.dispatchEvent(new CustomEvent('backListener'));
    }

    static styles = css`
        .week {
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 10px;
            font-size: 24px;
        }
        .day {
            margin-bottom: 5px;
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
        p {
            font-size: 36px;
            margin: 10px;
            text-align: left;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'month-element': MonthElement;
    }
}
