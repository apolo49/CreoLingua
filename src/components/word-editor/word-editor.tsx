import type { PropsOf, Signal } from "@builder.io/qwik";
import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
import scopedStyle from "./word-editor.css?inline";
import { InputBox } from "~/components/input-box/input-box";
import { SelectDropdown } from "~/components/select-dropdown/select-dropdown";
import { MarkdownEntry } from "~/components/markdown-entry/markdown-entry";
import { type Word } from "~/interfaces/word";
import { type PartOfSpeech } from "~/interfaces/part-of-speech";
import { EtymologyAndConjugationsTabs } from "../etymology-conjugation-tabs/etymology-conjugation-tabs";
import { server$ } from "@builder.io/qwik-city";

type WordEditorProps = PropsOf<"div"> & {
  selectedWord: Signal<Word | undefined>;
  partsOfSpeech: PartOfSpeech[];
};

export const WordEditor = component$((props: WordEditorProps) => {
  useStylesScoped$(scopedStyle);

  const selectedWord: Word = props.selectedWord.value!;

  const conWordInputValue = useSignal(selectedWord.conWord);
  const localWordInputValue = useSignal(selectedWord.localWord);
  const pronunciationInputValue = useSignal(selectedWord.pronunciation);

  const updateWord = server$(() => {
    // TODO: Update word.
  });

  // Track Constructed Word value
  useTask$(({ track }) => {
    track(() => conWordInputValue.value);
    if (props.selectedWord.value == null) return;
    props.selectedWord.value.conWord = conWordInputValue.value!;
    updateWord();
  });

  // Track Local/Native Word value
  useTask$(({ track }) => {
    track(() => localWordInputValue.value);
    if (props.selectedWord.value == null) return;
    props.selectedWord.value.localWord = localWordInputValue.value!;
    updateWord();
  });

  // Track pronunciation value
  useTask$(({ track }) => {
    track(() => pronunciationInputValue.value);
    if (props.selectedWord.value == null) return;
    props.selectedWord.value.pronunciation = pronunciationInputValue.value!;
    updateWord();
  });

  return (
    <div class="word_editor">
      <h2 class="subtitle">{conWordInputValue.value}</h2>
      <div>
        <label>Conlang Word: </label>
        <InputBox boundvalue={conWordInputValue} value={selectedWord.conWord} />
        <br />
        <label>Native Language Word</label>
        <InputBox
          boundvalue={localWordInputValue}
          value={selectedWord.localWord}
        />
        <br />
        <SelectDropdown partsOfSpeech={props.partsOfSpeech} />
        <br />
        <label>Pronunciation</label>
        <InputBox
          boundvalue={pronunciationInputValue}
          value={selectedWord.pronunciation}
        />
        <label>Definition</label>
        <MarkdownEntry value={selectedWord.definition} />
        <EtymologyAndConjugationsTabs />
      </div>
    </div>
  );
});
