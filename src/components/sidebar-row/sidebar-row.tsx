import type { PropsOf } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./sidebar-row.css?inline";

type SidebarRowProps = PropsOf<"div"> & {
  label: string;
};

export const SidebarRow = component$((props: SidebarRowProps) => {
  useStylesScoped$(scopedStyle);
  return (
    <div class="row">
      <div class="tl-row">
        <div class="tl-twistie" />
        <div class="label-container">
          <span class="label">{props.label}</span>
        </div>
      </div>
    </div>
  );
});
