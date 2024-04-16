import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./text-button.css?inline";

type TextButtonProps = PropsOf<"div"> & PropsOf<"button"> & PropsOf<"a">;

export const TextButton = component$((props: TextButtonProps) => {
  useStylesScoped$(scopedStyle);

  return (
    <div class="button-container">
      <button onClick$={props.onClick$} class="text-button">
        <span>
          <Slot />
        </span>
      </button>
    </div>
  );
});
