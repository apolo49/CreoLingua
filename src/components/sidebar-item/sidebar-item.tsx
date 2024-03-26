import type { PropsOf } from "@builder.io/qwik";
import { $, component$, Slot, useStyles$ } from "@builder.io/qwik";
import { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from "@qwik-ui/headless";
import scopedStyle from "./sidebar-item.css?inline";

type SidebarItemProps = PropsOf<"div"> & {
    title: string
    noTopBorder?: boolean | undefined
}

export const SidebarItem = component$((props: SidebarItemProps) => {

    const updateCodicon = $((_: PointerEvent, el: HTMLButtonElement) => {
        const codicon = el.getElementsByClassName("codicon")[0];
        if (el.getAttribute("data-state") === "closed") codicon.setAttribute("class", "codicon codicon-chevron-down");
        if (el.getAttribute("data-state") === "open") codicon.setAttribute("class", "codicon codicon-chevron-right");
    })

    const calculateHeight = $((_: PointerEvent, el: HTMLButtonElement) => {
        const Accordion = el.parentElement?.parentElement?.parentElement;
        if (Accordion == null) return;
        const items = Accordion.children;
        let height = Accordion.parentElement?.clientHeight || 0;
        for (let i = 0; i < items.length; i++){
            if (el.parentElement?.parentElement == null) continue
            if (items[i].isSameNode(el.parentElement.parentElement)) {
                continue
            }
            height -= items[i].clientHeight;
        }
        // TODO: Get Accordion content
    })

    const noTopBorder = props.noTopBorder || false;

    useStyles$(scopedStyle);
    return (
        <AccordionItem>
            <AccordionHeader as="h3" style="margin-block: 0;">
                <AccordionTrigger onClick$={[updateCodicon, calculateHeight]} class="sidebar-header" style={noTopBorder ? "border-top: 0px;" : ""}>
                    <span class="codicon codicon-chevron-right" />
                    <span>
                        {props.title}
                    </span>
                </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
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