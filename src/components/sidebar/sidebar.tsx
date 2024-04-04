import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle1 from "./sidebar.css?inline";
import { SidebarTitle } from "../sidebar-title/sidebar-title";
import { AccordionRoot } from "@qwik-ui/headless";

type SidebarProps = PropsOf<"div"> & {
  left?: number;
  title: string;
};

export const Sidebar = component$((props: SidebarProps) => {
  useStylesScoped$(scopedStyle1);

  const left = props.left || 48;

  return (
    <aside
      style={`width: 268px; position: absolute; background-color: rgb(24, 24, 24); color: rgb(204, 204, 204); border-right: 1px solid rgb(43, 43, 43); outline-color: rgba(83, 89, 93, 0.5);`}
      class="part sidebar left pane-composite-part"
    >
      <SidebarTitle title={props.title} />
      <div class="content">
        <AccordionRoot style="display: flex; flex-direction: column; max-height: inherit; height: inherit;">
          <Slot />
        </AccordionRoot>
      </div>
    </aside>
  );
});
