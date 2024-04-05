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
import { Tab, TabList, TabPanel, Tabs } from "@qwik-ui/headless";
import { Parser, HtmlRenderer, Node } from "commonmark";
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

  const updatePreview = $((e: monaco.editor.IModelContentChangedEvent) => {
    console.log(e.eol);
    const markdown = monaco_editor.monacoInstance?.getValue();
    markdownParser.parsed_markdown = noSerialize(
      markdownParser.parser?.parse(markdown!),
    );
    markdownResult.value = markdownParser.writer?.render(
      markdownParser.parsed_markdown!,
    )!;
  });

  useVisibleTask$(() => {
    const editor = monaco.editor.create(editorRef.value!, {
      language: "markdown",
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      theme: "vs-dark",
    });
    monaco_editor.monacoInstance = noSerialize(editor);
    monaco_editor.monacoInstance?.onDidChangeModelContent(updatePreview);
  });

  return (
    <Tabs behavior="manual">
      <TabList>
        <Tab>Definition Input</Tab>
        <Tab>Definition Preview</Tab>
      </TabList>
      <TabPanel>
        <div class="markdown-editor" style="width: 100%; height:200px;">
          <div style="width:100%; height:100%;" ref={editorRef}></div>
        </div>
      </TabPanel>
      <TabPanel>
        <div dangerouslySetInnerHTML={markdownResult.value}></div>
      </TabPanel>
    </Tabs>
  );
});
