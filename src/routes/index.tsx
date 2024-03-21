import { invoke } from "@tauri-apps/api"
import { open } from '@tauri-apps/api/dialog';
import { appConfigDir } from '@tauri-apps/api/path';
import { component$, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

    const file_contents = useSignal('')

    return (
        <>
            <h1>Welcome to CreoLingua!</h1>
            <h2>The most advanced conlang tool.</h2>
            <p style="text-align: center;">From here you can open an existing language file or create a new empty conlang.</p>
            <div style="text-align:center;">
                <Link href="/lexicon"><button>New Language</button></Link>
                <br />
                <button style="margin: 1em 0px;" onClick$={async () => {
                    const selected = await open({
                        directory: false,
                        multiple: false,
                        defaultPath: await appConfigDir(),
                        filters: [{
                            name: "PolyGlot Dictionaries",
                            extensions: ["pgd"]
                        }]
                    });
                    if (!selected) return;
                    console.log(selected)
                    file_contents.value = await invoke('open_language', { filePath: selected })
                }}>Open Language</button>
                <br />
                <Link href="/manual"><button>Open Manual</button></Link>
                <p>{file_contents.value}</p>
            </div >
        </>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
