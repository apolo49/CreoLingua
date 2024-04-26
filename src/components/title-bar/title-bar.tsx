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
import { AppIcon } from "./icon";

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

  return (
    <div data-tauri-drag-region id="titlebar" class="title-bar">
      <div data-tauri-drag-region class="title-bar-container">
        <div class="title-bar-left">
          {/* <AppIcon class="appicon" /> */}
          <div class="menubar" role="menubar">
            <div
              class="menubar-menu-button"
              role="menuitem"
              aria-label="File"
              aria-haspopup="true"
              aria-keyshortcuts="Alt+f"
            >
              <div class="menubar-menu-title" role="none" aria-hidden="true">
                <mnemonic aria-hidden="true">F</mnemonic>ile
              </div>
            </div>
            <div
              class="menubar-menu-button"
              role="menuitem"
              aria-label="Edit"
              aria-haspopup="true"
              aria-keyshortcuts="Alt+e"
            >
              <div class="menubar-menu-title" role="none" aria-hidden="true">
                <mnemonic aria-hidden="true">E</mnemonic>dit
              </div>
            </div>
            <div
              class="menubar-menu-button"
              role="menuitem"
              aria-label="View"
              aria-haspopup="true"
              aria-keyshortcuts="Alt+v"
            >
              <div class="menubar-menu-title" role="none" aria-hidden="true">
                <mnemonic aria-hidden="true">V</mnemonic>iew
              </div>
            </div>
            <div
              class="menubar-menu-button"
              role="menuitem"
              aria-label="Help"
              aria-haspopup="true"
              aria-keyshortcuts="Alt+h"
            >
              <div class="menubar-menu-title" role="none" aria-hidden="true">
                <mnemonic aria-hidden="true">H</mnemonic>elp
              </div>
            </div>
          </div>
        </div>
        <div class="titlebar-right">
          <div class="window-controls">
            <div class="titlebar-button" id="titlebar-minimize">
              <img
                src="https://api.iconify.design/mdi:window-minimize.svg"
                alt="minimize"
              />
            </div>
            <div class="titlebar-button" id="titlebar-maximize">
              <img
                src="https://api.iconify.design/mdi:window-maximize.svg"
                alt="maximize"
              />
            </div>
            <div class="titlebar-button" id="titlebar-close">
              <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
