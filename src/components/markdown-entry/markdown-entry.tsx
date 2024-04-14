import type { PropsOf } from "@builder.io/qwik";
import {
  $,
  component$,
  useStylesScoped$,
  noSerialize,
  type NoSerialize,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import scopedStyle from "./markdown-entry.css?inline";
import tabButtonModule from "~/components/tab-button/tab-button.module.css";
import { Tab, TabList, TabPanel, Tabs } from "@qwik-ui/headless";
import type { Node } from "commonmark";
import { Parser, HtmlRenderer } from "commonmark";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type MarkdownEntryProps = PropsOf<"div"> & PropsOf<"textarea"> & {};

export const MarkdownEntry = component$((props: MarkdownEntryProps) => {
  useStylesScoped$(scopedStyle);

  const editorRef = useSignal<HTMLElement>();
  const markdownResult = useSignal<string>("");
  const markdownParser = useStore<{
    parser: NoSerialize<Parser>;
    writer: NoSerialize<HtmlRenderer>;
    parsed_markdown: NoSerialize<Node>;
  }>({
    parser: noSerialize(new Parser()),
    writer: noSerialize(new HtmlRenderer({ safe: true })),
    parsed_markdown: undefined,
  });

  const monaco_editor = useStore<{
    monacoInstance: NoSerialize<monaco.editor.IStandaloneCodeEditor>;
  }>({
    monacoInstance: undefined,
  });

  const updatePreview = $(() => {
    const markdown = monaco_editor.monacoInstance?.getValue();
    markdownParser.parsed_markdown = noSerialize(
      markdownParser.parser?.parse(markdown!),
    );
    markdownResult.value =
      markdownParser.writer?.render(markdownParser.parsed_markdown!) || "";
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => props.value);
    monaco_editor.monacoInstance?.setValue(props.value?.toString() || "");
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const editor = monaco.editor.create(editorRef.value!, {
      language: "markdown",
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      theme: "vs-dark",
      value: props.value?.toString(),
      automaticLayout: true,
    });
    monaco_editor.monacoInstance = noSerialize(editor);
    monaco_editor.monacoInstance?.onDidChangeModelContent(updatePreview);
  });

  return (
    <Tabs behavior="manual">
      <TabList>
        <Tab class={tabButtonModule.tabButton} style="margin-right:1em;">
          Definition Input
        </Tab>
        <Tab class={tabButtonModule.tabButton}>Definition Preview</Tab>
      </TabList>
      <TabPanel>
        <div class="markdown-editor">
          <div style="height:200px;" ref={editorRef}></div>
        </div>
      </TabPanel>
      <TabPanel>
        <div
          style="overflow-y: auto;"
          class="markdown-editor"
          dangerouslySetInnerHTML={markdownResult.value}
        ></div>
      </TabPanel>
    </Tabs>
  );
});
