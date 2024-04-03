// import { useLocation } from "@builder.io/qwik-city";

import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle1 from "./sidebar.css?inline";
import { SidebarTitle } from "../sidebar-title/sidebar-title";

type SidebarProps = PropsOf<"div"> & {
  left?: number;
  title: string;
};

export const Sidebar = component$((props: SidebarProps) => {
  useStylesScoped$(scopedStyle1);

  const left = props.left || 48;

  // Used for getting current URL
  // const loc = useLocation();

  return (
    <aside
      style={`left: ${left}px; width: 268px; background-color: rgb(24, 24, 24); color: rgb(204, 204, 204); border-right: 1px solid rgb(43, 43, 43); outline-color: rgba(83, 89, 93, 0.5);`}
      class="part sidebar left pane-composite-part"
    >
      <SidebarTitle title={props.title} />
      <div class="content">
        <Slot />
      </div>
    </aside>
  );
});
