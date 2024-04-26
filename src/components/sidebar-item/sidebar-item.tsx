import type { PropsOf, QRLEventHandlerMulti } from "@builder.io/qwik";
import { $, component$, Slot, useSignal, useStyles$ } from "@builder.io/qwik";
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@qwik-ui/headless";
import scopedStyle from "./sidebar-item.css?inline";

type SidebarItemProps = PropsOf<"div"> & {
  title: string;
  noTopBorder?: boolean | undefined;
  onAddWord$?:
    | ((event: PointerEvent, element: HTMLElement) => never)
    | QRLEventHandlerMulti<PointerEvent, HTMLElement>;
};

export const SidebarItem = component$((props: SidebarItemProps) => {
  const noTopBorder = props.noTopBorder || false;
  const actionHovered = useSignal<boolean>(false);

  const test = $(() => {
    console.log("here");
  });

  useStyles$(scopedStyle);
  return (
    <AccordionItem data-collapsible>
      <AccordionHeader>
        <AccordionTrigger
          class="sidebar-header"
          style={noTopBorder ? "border-top: 0px;" : ""}
          disabled={actionHovered.value}
        >
          <span class="codicon" />
          <span>{props.title}</span>
          <div class="actions">
            <ul class="actions-container">
              <li onClick$={test} class="action-item menu-entry">
                <span
                  onMouseEnter$={() => (actionHovered.value = true)}
                  onMouseLeave$={() => (actionHovered.value = false)}
                  class="action-label codicon codicon-new-file"
                />
              </li>
            </ul>
          </div>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="collapsible-animation collapsible-content">
        <div role="tree">
          <div role="presentation">
            <div style="overflow-x: hidden;">
              <Slot />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
});
