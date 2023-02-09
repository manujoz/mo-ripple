import { LitElement, html, css } from "lit";

export class MoRipple extends LitElement {
    static styles = [
        css`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                display: block;
                cursor: pointer;
            }
            .container {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                overflow: hidden;
            }
            [hidden] {
                display: none;
            }
            span {
                position: absolute;
                background-color: var(--mo-ripple-color, currentColor);
                transform: translate(-50%, -50%);
                pointer-events: none;
                border-radius: 50%;
                animation: ripple 0.8s linear infinite;
            }
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: var(--mo-ripple-opacity, 0.25);
                }
                100% {
                    width: 800px;
                    height: 800px;
                    opacity: 0;
                }
            }
        `,
    ];

    render() {
        return html`<div class="container" hidden></div>`;
    }

    constructor() {
        super();

        /** @type {HTMLElement} */
        this.parent = undefined;

        this.timeouts = {
            rippleContainer: null,
        };
        this.listeners = {
            click: (ev) => {
                this.handleClick(ev);
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.parent = this.parentNode.host || this.parentNode;
        this.parent.addEventListener("mousedown", this.listeners.click);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.parent.removeEventListener("mousedown", this.listeners.click);
    }

    /**
     * Handle click event
     * @param {Event} ev
     */
    handleClick(ev) {
        let x = ev.offsetX;
        let y = ev.offsetY;

        let ripples = document.createElement("span");
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;

        const container = this.shadowRoot.querySelector("div.container");
        container.removeAttribute("hidden");
        container.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 800);

        clearTimeout(this.timeouts.rippleContainer);
        this.timeouts.rippleContainer = setTimeout(() => {
            container.setAttribute("hidden", "");
        }, 850);
    }
}
customElements.define("mo-ripple", MoRipple);
