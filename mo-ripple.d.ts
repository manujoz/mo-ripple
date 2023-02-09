import { LitElement } from "lit";
import { customElement } from "lit/decorators";

/**
 * Ripple effect on Lit elements
 *
 * @cssprop --mo-ripple-color
 * @cssprop --mo-ripple-opacity
 */
@customElement("mo-ripple")
export class MoRipple extends LitElement {
    parent: HTMLElement;
}

declare global {
    interface HTMLElementTagNameMap {
        "mo-ripple": MoRipple;
    }
}
