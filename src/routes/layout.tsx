import {
  $,
  component$,
  Slot,
  useOnWindow,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";
import { ActivityBar } from "~/components/activity-bar/activity-bar";
import { TitleBar } from "~/components/title-bar/title-bar";
import { platform } from "@tauri-apps/plugin-os";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);

  const plat = useStore({ platform: "" });

  useOnWindow(
    "DOMContentLoaded",
    $(async () => {
      plat.platform = await platform();
    }),
  );

  return (
    <>
      {plat.platform !== "macos" ? <TitleBar title="CreoLingua" /> : <></>}
      <ActivityBar />
      <main style="margin-left:48px; height: 100vh; overflow-y: hidden;">
        <Slot />
      </main>
    </>
  );
});
