// import { useLocation } from "@builder.io/qwik-city";

import type { PropsOf } from "@builder.io/qwik";
import {
  $,
  component$,
  useOnDocument,
  useStylesScoped$,
} from "@builder.io/qwik";
import scopedStyle from "./title-bar.css?inline";
import { getCurrent } from "@tauri-apps/api/webview";

type TitleBarProps = PropsOf<"div"> & {
  title: string;
};

export const TitleBar = component$((props: TitleBarProps) => {
  useStylesScoped$(scopedStyle);

  useOnDocument(
    "load",
    $(() => {
      const titlebar = document.getElementById("titlebar");
      if (titlebar == null) return;
      getCurrent().window.onFocusChanged(({ payload: focused }) => {
        titlebar.setAttribute("data-active", `${focused}`);
      });
    }),
  );

  return <div id="titlebar" class="title-bar"></div>;
});
