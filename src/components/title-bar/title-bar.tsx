// import { useLocation } from "@builder.io/qwik-city";

import type { PropsOf } from "@builder.io/qwik";
import {
  component$,
  Slot,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import scopedStyle from "./title-bar.css?inline";
import { window } from "@tauri-apps/api";

type SidebarProps = PropsOf<"div"> & {
  title: string;
};

export const TitleBar = component$((props: SidebarProps) => {
  useStylesScoped$(scopedStyle);
  return (
    <div bind:data-active={window.appWindow.isFocused} class="title-bar"></div>
  );
});
