import type { PropsOf } from "@builder.io/qwik";
import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from "@qwik-ui/headless";
import scopedStyle from "./sidebar-item.css?inline";

type SidebarItemProps = PropsOf<"div"> & {
    title: string
    noTopBorder?: boolean | undefined
}

export const SidebarItem = component$((props: SidebarItemProps) => {

    const noTopBorder = props.noTopBorder || false;

    useStyles$(scopedStyle);
    return (
        <AccordionItem>
            <AccordionHeader as="h3" style="margin-block: 0;">
                <AccordionTrigger class="sidebar-header" style={noTopBorder ? "border-top: 0px;" : ""}>
                    <span class="codicon codicon-chevron-right" />
                    <span>
                        {props.title}
                    </span>
                </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
                <div role="tree">
                    <div role="presentation">
                        <div style="overflow-x: hidden; height: 88vh;">
                            <Slot />
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
});