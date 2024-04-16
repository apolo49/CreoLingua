import type { PropsOf } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import scopedStyle from "./etymology-conjugations-tabs.css?inline";
import { Tab, TabList, TabPanel, Tabs } from "@qwik-ui/headless";
import tabButtonModule from "~/components/tab-button/tab-button.module.css";

type EtymologyAndConjugationsTabsProps = PropsOf<"div">;

export const EtymologyAndConjugationsTabs = component$(
  (props: EtymologyAndConjugationsTabsProps) => {
    useStylesScoped$(scopedStyle);
    return (
      <Tabs style="margin-top:1em;">
        <TabList>
          <Tab style="margin-right:1em;" class={tabButtonModule.tabButton}>
            Etymology
          </Tab>
          <Tab class={tabButtonModule.tabButton}>Conjugations / Declension</Tab>
        </TabList>
        <TabPanel id="EtymologyTab">
          <p>Etymology</p>
        </TabPanel>
        <TabPanel id="ConjgationsTab">
          <p>Conjugations</p>
        </TabPanel>
      </Tabs>
    );
  },
);
