import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SidebarItem } from "~/components/sidebar-item/sidebar-item";
import { SidebarRow } from "~/components/sidebar-row/sidebar-row";
import { Sidebar } from "~/components/sidebar/sidebar";

export default component$(() => {

    // const greetMsg = useSignal('')
  
    return (
      <>
        <Sidebar title="Lexicon">
          <SidebarItem title="Verbs" noTopBorder={true}>
            {[...Array(100)].map((_, i) => <SidebarRow key={i} label="Hello" />)}
          </SidebarItem>
          <SidebarItem title="Noun">
          </SidebarItem>
          <SidebarItem title="Adjective">
          </SidebarItem>
        </Sidebar>
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