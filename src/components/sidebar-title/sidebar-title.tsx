import type { PropsOf } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./sidebar-title.css?inline";

type SidebarTitleProps = PropsOf<"div"> & {
  title: string;
};

export const SidebarTitle = component$((props: SidebarTitleProps) => {
  useStylesScoped$(scopedStyle);

  return (
    <div class="sidebar-title">
      <div class="sidebar-title-label">
        <h2 title={props.title}>{props.title}</h2>
      </div>
    </div>
  );
});
