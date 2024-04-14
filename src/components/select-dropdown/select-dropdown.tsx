import { component$, useStyles$ } from "@builder.io/qwik";
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@qwik-ui/headless";
import scopedStyle from "./select-dropdown.css?inline";
import { type PartOfSpeech } from "~/interfaces/part-of-speech";

interface SelectDropdownProps {
  partsOfSpeech: Array<PartOfSpeech>;
}

export const SelectDropdown = component$((props: SelectDropdownProps) => {
  useStyles$(scopedStyle);
  return (
    <Select class="select-dropdown-widget show-file-icons" aria-label="hero">
      <div style="margin:auto;" class="select-dropdown-header">
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
            {props.partsOfSpeech.map((PoS: PartOfSpeech) => (
              <SelectOption key={PoS.classId}>{PoS.className}</SelectOption>
            ))}
          </SelectListbox>
        </div>
      </SelectPopover>
    </Select>
  );
});
