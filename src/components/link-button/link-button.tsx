import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./link-button.css?inline";

type LinkButtonProps = PropsOf<"div"> & PropsOf<"button"> & PropsOf<"a">;

export const LinkButton = component$((props: LinkButtonProps) => {
  useStylesScoped$(scopedStyle);

  return (
    <div class="button-container">
      <a href={props.href} class="link-button">
        <span>
          <Slot />
        </span>
      </a>
    </div>
  );
});
