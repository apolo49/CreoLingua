// import { useLocation } from "@builder.io/qwik-city";

import { component$, useStyles$ } from "@builder.io/qwik";
import style from "./action-bar.css?inline";
import { ActionItem } from "../action-item/action-item";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const ActionBar = component$(() => {
    useStyles$(style)

    // Used for getting current URL
    // const loc = useLocation();

    return (
        <div class="monaco-action-bar vertical">
            <ul class="actions-container" role="tablist">
                <ActionItem icon="book" role="tab"/>
                <ActionItem icon="whole-word" role="tab"/>
                <ActionItem icon="comment" role="tab"/>
                <ActionItem icon="circuit-board" role="tab"/>
                <ActionItem icon="symbol-operator" role="tab"/>
                <ActionItem icon="symbol-operator" role="tab"/>
                <ActionItem icon="music" role="tab"/>
                <ActionItem icon="notebook" role="tab"/>
                <ActionItem icon="question" role="tab"/>
            </ul>
        </div>
    );
});
