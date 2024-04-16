import type { PropsOf, QRLEventHandlerMulti, Signal } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./input-box.css?inline";

type InputBoxProps = PropsOf<"input"> & {
  onInput$?: QRLEventHandlerMulti<InputEvent, HTMLDivElement>;
  boundvalue?: Signal<string>;
};

export const InputBox = component$((props: InputBoxProps) => {
  useStylesScoped$(scopedStyle);
  return (
    <div onInput$={props.onInput$} class="inputbox idle">
      <div class="ibwrapper">
        <input
          bind:value={props.boundvalue}
          ref={props.ref}
          id={props.id}
          class="input"
          value={props.value}
          placeholder={props.placeholder}
          title={props.title}
        />
      </div>
    </div>
  );
});
