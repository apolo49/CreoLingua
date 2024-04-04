import {
  $,
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { invoke } from "@tauri-apps/api/core";
import { SidebarItem } from "~/components/sidebar-item/sidebar-item";
import { SidebarRow } from "~/components/sidebar-row/sidebar-row";
import { Sidebar } from "~/components/sidebar/sidebar";
import scopedStyles from "./lexicon.css?inline";
import { InputBox } from "~/components/input-box/input-box";
import { SelectDropdown } from "~/components/select-dropdown/select-dropdown";

interface Word {
  autoDeclOverride: string;
  conWord: string;
  definition: string;
  localWord: string;
  pronunciation: string;
  wordClassCollection: {
    wordClassification: string;
  };
  wordClassTextValueCollection: object;
  wordEtymologyNotes: object;
  wordId: number;
  wordProcOverride: string;
  wordRuleOverride: string;
  wordTypeId: number;
}

export default component$(() => {
  const words = useSignal<Array<Word>>([]);
  const selectedWord = useSignal<Word>();
  useStylesScoped$(scopedStyles);

  useVisibleTask$(async () => {
    words.value = JSON.parse(await invoke("get_words"));
  });

  const updateWord = $((event: InputEvent, el: HTMLDivElement) => {
    if (selectedWord.value == null) return;
    const input = event.target as HTMLElement;
    if (input.id === "conWord") {
      console.log("here");
      selectedWord.value.conWord = (input as HTMLInputElement).value;
    }
  });

  if (words.value == null) {
    words.value = [];
  }

  return (
    <div style="display:block; overflow:hidden">
      <Sidebar title="Lexicon">
        <SidebarItem title="Verbs" noTopBorder={true}>
          {words.value.map((word, i) => (
            <SidebarRow
              onClick$={() => {
                selectedWord.value = word;
              }}
              key={word.wordId}
              label={word.conWord}
            />
          ))}
        </SidebarItem>
        <SidebarItem title="Noun"></SidebarItem>
        <SidebarItem title="Adjective"></SidebarItem>
      </Sidebar>
      {selectedWord.value && (
        <div style="float:left; position: absolute; display: block; white-space:normal; height:100%; width:100%; margin-left:268px;">
          <h2 class="subtitle">{selectedWord.value.conWord}</h2>
          <div onInput$={updateWord}>
            <label>Conlang Word: </label>
            <InputBox
              value={selectedWord.value.conWord}
              id="conWord"
              type="text"
            />
            <label>Native Language Word</label>
            <InputBox
              value={selectedWord.value.localWord}
              id="localWord"
              type="text"
            />
            {/* <select id="partsOfSpeech"></select> */}
            <SelectDropdown />
            <label>Pronunciation</label>
            <InputBox
              value={selectedWord.value.pronunciation}
              id="pronunciation"
              type="text"
            />
          </div>
        </div>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Lexicon",
  meta: [
    {
      name: "description",
      content: "Lexicon",
    },
  ],
};
