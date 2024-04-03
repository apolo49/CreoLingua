// import { useLocation } from "@builder.io/qwik-city";

import { component$, useStyles$ } from "@builder.io/qwik";
import scopedStyle1 from "./activity-bar.css?inline";
import scopedStyle2 from "./activity-action.css?inline";
import { ActionBar } from "../action-bar/action-bar";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const ActivityBar = component$(() => {
  useStyles$(scopedStyle1);
  useStyles$(scopedStyle2);

  // Used for getting current URL
  // const loc = useLocation();

  return (
    <aside class="part activitybar left bordered">
      <div class="content" style="width: 48px; height: 100vh;">
        <ActionBar />
      </div>
    </aside>
  );
});
