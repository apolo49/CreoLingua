import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Sidebar } from "~/components/sidebar/sidebar";

export default component$(() => {

    // const greetMsg = useSignal('')
  
    return (
      <>
        <Sidebar title="Lexicon"/>
      </>
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