import type { PropsOf } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./input-box.css?inline";

type InputBoxProps = PropsOf<"div"> & PropsOf<"input">;

export const InputBox = component$((props: InputBoxProps) => {
  useStylesScoped$(scopedStyle);
  return (
    <div class="inputbox idle">
      <div class="ibwrapper">
        <input
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
