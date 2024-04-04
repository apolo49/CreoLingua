import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik";
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectPopover,
  SelectTrigger,
  SelectValue,
  usePopover,
} from "@qwik-ui/headless";
import scopedStyle from "./select-dropdown.css?inline";

export const SelectDropdown = component$(() => {
  const users: Array<string> = ["1", "2", "3"];

  const correctLeft = $((isOpen: boolean) => {
    if (!isOpen) return;
  });

  useStyles$(scopedStyle);
  return (
    <Select
      onOpenChange$={correctLeft}
      class="select-dropdown-widget show-file-icons"
      aria-label="hero"
    >
      <div class="select-dropdown-header">
        <div class="select-dropdown-and-message">
          <SelectTrigger class="select-dropdown-input-box">
            <SelectValue
              class="select-dropdown-input-value"
              placeholder="Select an option"
            />
          </SelectTrigger>
        </div>
      </div>
      <SelectPopover class="select-dropdown-popover">
        <div class="select-dropdown-listbox">
          <SelectListbox class="select-dropdown-list">
            {/* {users.map((user) => ( */}
            <SelectOption>1</SelectOption>
            <SelectOption>2</SelectOption>
            {/* ))} */}
          </SelectListbox>
        </div>
      </SelectPopover>
    </Select>
  );
});
