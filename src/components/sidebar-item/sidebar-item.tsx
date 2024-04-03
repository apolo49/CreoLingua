import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useStyles$ } from "@builder.io/qwik";
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
};

export const SidebarItem = component$((props: SidebarItemProps) => {
  const id = `${props.title}-collapsible`;
  const noTopBorder = props.noTopBorder || false;

  useStyles$(scopedStyle);
  return (
    <AccordionItem data-collapsible id={id}>
      <AccordionHeader>
        <AccordionTrigger
          class="sidebar-header"
          style={noTopBorder ? "border-top: 0px;" : ""}
        >
          <span class="codicon" />
          <span>{props.title}</span>
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
