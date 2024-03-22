/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { useLocation } from "@builder.io/qwik-city";

import type { PropsOf } from "@builder.io/qwik";
import { component$, useStyles$ } from "@builder.io/qwik";
import style from "./action-item.css?inline";
import { Tooltip } from '@qwik-ui/headless';
import { Link } from "@builder.io/qwik-city";

type ActionItemProps = PropsOf<"li"> & {
    role?: string
    icon?: string
    url: string
    toolTipText: string
}

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const ActionItem = component$((props: ActionItemProps) => {
    useStyles$(style)
    const icon = props.icon || false


    return (
        <Tooltip class="monaco-hover" content={props.toolTipText} offset={8} position="right">
            <li class={`action-item ${(icon && "icon") || ""}`} role={props.role || ""}>
                <Link href={props.url} class={`action-label ${(icon && `codicon codicon-${icon}`) || ""}`} />
                <div class="active-item-indicator"></div>
            </li>
        </Tooltip>
    );
});
