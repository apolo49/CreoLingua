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
                <ActionItem icon="book" role="tab" url="lexicon" toolTipText="Lexicon"/>
                <ActionItem icon="whole-word" role="tab" url="word-generator" toolTipText="Word and Syllable Generator"/>
                <ActionItem icon="comment" role="tab" url="parts-of-speech" toolTipText="Parts of Speech"/>
                <ActionItem icon="circuit-board" role="tab" url="lexical-classes" toolTipText="Lexical Classes"/>
                <ActionItem icon="symbol-operator" role="tab" url="grammar" toolTipText="Grammar"/>
                <ActionItem icon="eye" role="tab" url="logographs" toolTipText="Logographs"/>
                <ActionItem icon="music" role="tab" url="phonology" toolTipText="Phonology and Romanisation"/>
                <ActionItem icon="notebook" role="tab" url="phrasebook" toolTipText="Phrasebook"/>
                <ActionItem icon="symbol-property" role="tab" url="properties" toolTipText="Language Properties"/>
                <ActionItem icon="question" role="tab" url="quiz" toolTipText="Quiz Generator"/>
            </ul>
        </div>
    );
});
