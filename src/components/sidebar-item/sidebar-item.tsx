import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useSignal, useStyles$ } from "@builder.io/qwik";
import {
  CollapsibleTrigger,
  Collapsible,
  CollapsibleContent,
} from "@qwik-ui/headless";
import scopedStyle from "./sidebar-item.css?inline";

type SidebarItemProps = PropsOf<"div"> & {
  title: string;
  noTopBorder?: boolean | undefined;
};

export const SidebarItem = component$((props: SidebarItemProps) => {
  const isOpen = useSignal<boolean>(false);
  const id = `${props.title}-collapsible`;
  const noTopBorder = props.noTopBorder || false;

  useStyles$(scopedStyle);
  return (
    <Collapsible id={id} bind:open={isOpen}>
      <CollapsibleTrigger
        class="sidebar-header"
        style={noTopBorder ? "border-top: 0px;" : ""}
      >
        <span
          class={[
            "codicon",
            isOpen.value ? "codicon-chevron-down" : "codicon-chevron-right",
          ]}
        />
        <span>{props.title}</span>
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible-animation collapsible-content">
        <div role="tree">
          <div role="presentation">
            <div style="overflow-x: hidden;">
              <Slot />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
});
