import {
  $,
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { invoke } from "@tauri-apps/api/core";
import { SidebarItem } from "~/components/sidebar-item/sidebar-item";
import { SidebarRow } from "~/components/sidebar-row/sidebar-row";
import { Sidebar } from "~/components/sidebar/sidebar";
import scopedStyles from "./lexicon.css?inline";
import { type PartOfSpeech } from "~/interfaces/part-of-speech";
import { type Word } from "~/interfaces/word";
import { isServer } from "@builder.io/qwik/build";
import { WordEditor } from "~/components/word-editor/word-editor";

export default component$(() => {
  const words = useSignal<Array<Word>>([]);
  const partsOfSpeech = useSignal<Array<PartOfSpeech>>([]);
  const selectedWord = useSignal<Word>();
  useStylesScoped$(scopedStyles);

  useTask$(() => {
    const intervalId = setInterval(async () => {
      if (isServer) return;
      words.value = JSON.parse(await invoke("get_words"));
      partsOfSpeech.value = JSON.parse(await invoke("get_parts_of_speech"));
    }, 10);
    return () => clearInterval(intervalId);
  });

  const addWord = $((classId: number) => {
    const word = { conWord: "New Word", wordTypeId: classId } as Word;
    words.value.push(word);
  });

  return (
    <div style="display:block; overflow:hidden;">
      <Sidebar title="Lexicon">
        {partsOfSpeech.value.map((PoS, i) => (
          <SidebarItem
            key={PoS.classId}
            title={PoS.className}
            noTopBorder={i === 0}
            //TODO: Make adding words work.
            onAddWord$={() => addWord(PoS.classId)}
          >
            {words.value.map(
              (word) =>
                word.wordTypeId === PoS.classId && (
                  <SidebarRow
                    onClick$={() => {
                      selectedWord.value = word;
                    }}
                    key={word.wordId}
                    label={word.conWord}
                  />
                ),
            )}
          </SidebarItem>
        ))}
      </Sidebar>
      {selectedWord.value && (
        <WordEditor
          selectedWord={selectedWord}
          partsOfSpeech={partsOfSpeech.value}
        />
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
