import type { PropsOf } from "@builder.io/qwik";
import { $, component$, Slot, useSignal, useStyles$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from "@qwik-ui/headless";
import scopedStyle from "./sidebar-item.css?inline";

type SidebarItemProps = PropsOf<"div"> & {
    title: string
    noTopBorder?: boolean | undefined
}

export const SidebarItem = component$((props: SidebarItemProps) => {

    const isOpen = useSignal('');
    const Id = `${props.title}-trigger`;

    // const updateCodicon = $((_: PointerEvent, el: HTMLButtonElement) => {
        
    // })

    const calculateHeight = $((_: PointerEvent, el: HTMLButtonElement) => {
        const currentAccordionItem = el.parentElement?.parentElement;
        if (currentAccordionItem == null) return;
        const Accordion = currentAccordionItem.parentElement;
        if (Accordion == null) return;
        const items = Accordion.children;
        let height = Accordion.parentElement?.clientHeight || 0;
        for (let i = 0; i < items.length; i++){
            height -= items[i].clientHeight;
        }
        // TODO: Get Accordion content
        const content = currentAccordionItem.querySelector("[role=presentation]")?.firstElementChild;
        if (content == null) return;
        content.setAttribute("style", `overflow-x: hidden; height: ${height}px`)
    })

    useTask$(function onStateChange({ track }) {
        track(() => isOpen);
        if (isServer) return;
        const el = document.getElementById(Id);
        console.log(el);
        if (el == null) return;
        const codicon = el.getElementsByClassName("codicon")[0];
        if (el.getAttribute("data-state") === "closed") codicon.setAttribute("class", "codicon codicon-chevron-down");
        if (el.getAttribute("data-state") === "open") codicon.setAttribute("class", "codicon codicon-chevron-right");
      }
    );

    const noTopBorder = props.noTopBorder || false;

    // onClick$={[updateCodicon, calculateHeight]}

    useStyles$(scopedStyle);
    return (
        <AccordionItem>
            <AccordionHeader as="h3" style="margin-block: 0;">
                <AccordionTrigger id={Id} bind:data-state={isOpen} class="sidebar-header" style={noTopBorder ? "border-top: 0px;" : ""}>
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