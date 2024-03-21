// import { useLocation } from "@builder.io/qwik-city";

import type { PropsOf } from "@builder.io/qwik";
import { component$, useStyles$ } from "@builder.io/qwik";
import style from "./action-item.css?inline";

type ActionItemProps = PropsOf<"li"> & {
    role?: string
    icon?: string

}

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const ActionItem = component$((props: ActionItemProps) => {
    useStyles$(style)
    const icon = props.icon || false

    return (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        <li class={`action-item ${(icon && "icon") || ""} checked`} role={props.role || ""}>
            <a href="" class={`action-label ${(icon && `codicon codicon-${icon}`) || ""}`}></a>
            <div class="active-item-indicator"></div>
        </li>
    );
});
