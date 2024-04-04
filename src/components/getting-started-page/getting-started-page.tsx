import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./getting-started-page.css?inline";
import { Link } from "@builder.io/qwik-city";
import { appConfigDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

export const GettingStartedPage = component$(() => {
  const file_contents = useSignal("");
  useStylesScoped$(scopedStyle);

  return (
    <div class="getting-started">
      <div class="getting-started-categories-container">
        <header>
          <h1 class="product-name caption">CreoLingua</h1>
          <p class="subtitle description">The most advanced conlang tool.</p>
        </header>
        <div class="categories-column categories-column-left">
          <div class="index-list start-container">
            <h2>Start</h2>
            <ul>
              <li>
                <Link href="/lexicon">
                  <button
                    class="button-link"
                    title="Create a new untitled language"
                  >
                    <span class="codicon codicon-new-file icon-widget"></span>
                    <span>New Language...</span>
                  </button>
                </Link>
              </li>
              <li>
                <button
                  class="button-link"
                  title="Open a language to start working"
                  onClick$={async () => {
                    const selected = await open({
                      directory: false,
                      multiple: false,
                      defaultPath: await appConfigDir(),
                      filters: [
                        {
                          name: "PolyGlot Dictionaries",
                          extensions: ["pgd"],
                        },
                      ],
                    });
                    if (!selected) return;
                    file_contents.value = await invoke("open_language", {
                      filePath: selected.path,
                    });
                  }}
                >
                  <span class="codicon codicon-folder-opened icon-widget"></span>
                  <span>Open Language...</span>
                </button>
              </li>
              <li>
                <Link href="/manual">
                  <button
                    class="button-link"
                    title="Open the CreoLingua Manual"
                  >
                    <span class="codicon codicon-notebook icon-widget"></span>
                    <span>Open Manual...</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          {file_contents.value ? <p>{file_contents.value}</p> : <></>}
        </div>
      </div>
    </div>
  );
});
