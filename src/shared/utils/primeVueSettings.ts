import { ButtonProps } from "primevue/button";
import { CalendarPassThroughOptions } from "primevue/calendar";
import { DropdownContext } from "primevue/dropdown";
import { InputSwitchProps } from "primevue/inputswitch";
import { InputTextContext } from "primevue/inputtext";
import { MessageProps } from "primevue/message";
import { SelectButtonContext } from "primevue/selectbutton";
import { PTOptions } from "primevue/ts-helpers";

export default {
  pt: {
    button: {
      root: ({ props }: { props: ButtonProps }) => {
        return {
          class: [
            "rounded ",
            props?.severity === "success"
              ? "!bg-green !text-white !shadow-none"
              : props?.severity === "danger"
              ? "!bg-red"
              : props?.severity === "info"
              ? "!border !border-blue"
              : props?.severity === "secondary"
              ? "!bg-gradient-to-r !from-[#FEFEFE] !to-[#F6F6F6] !border !border-grey-400 !text-grey-900 !shadow-none"
              : "",
            props.link ? "!bg-transparent !text-green" : "",
            props.text ? "!p-0" : "!py-2 !px-3",
          ],
        };
      },
    },
    inputText: {
      root: ({ context }: { context: InputTextContext }) => {
        return {
          class: [
            "border border-grey-400 rounded h-9 py-2 px-4",
            "focus:!shadow-none focus:!border-green hover:!border-green",
            context.disabled
              ? "focus:!border-grey-400 hover:!border-grey-400 bg-[#F2F3F3]"
              : "",
          ],
        };
      },
    },
    inputswitch: {
      root: { class: ["inline-block relative", "w-12 h-7"] },
      slider: ({ props }: { props: InputSwitchProps }) => {
        return {
          class: [
            "absolute cursor-pointer top-0 left-0 right-0 bottom-0 border border-transparent",
            "transition-colors duration-200 rounded-2xl",
            "focus:outline-none focus:outline-offset-0 focus:shadow-none",
            "before:absolute before:content-'' before:top-1/2 before:bg-white before:dark:bg-gray-900 before:w-5 before:h-5 before:left-1 before:-mt-2.5 before:rounded-full before:transition-duration-200",
            props.modelValue ? "!bg-green" : "!bg-grey-400",
          ],
        };
      },
    },
    dropdown: {
      root: {
        class: [
          "border border-grey-400 rounded h-9 py-2 px-4 !shadow-none",
          "focus:!border-green focus:!shadow-none",
          "hover:!border-green active:!border-green",
        ],
      },
      wrapper: {
        class: "border border-grey-400 rounded px-4 py-2",
      },
      trigger: {
        class: ["!w-max !ml-2"],
      },
      item: ({ context }: { context: DropdownContext }) => ({
        class: [
          "!text-sm !text-grey-900 !p-3",
          context.selected ? "!bg-green-50" : "",
        ],
      }),
      input: {
        class: ["!p-0 !text-sm !flex !items-center"],
      },
      emptyMessage: {
        class: "text-grey-900 text-sm",
      },
    },
    multiselect: {
      root: {
        class: [
          "border border-grey-400 rounded h-9 py-2 px-4 !shadow-none",
          "focus:!border-green focus:!shadow-none",
          "hover:!border-green active:!border-green",
        ],
      },
      wrapper: {
        class: "border border-grey-400 rounded px-4 py-2 bg-white",
      },
      header: {
        class: "!hidden",
      },
      trigger: {
        class: ["!w-max"],
      },
      item: {
        class: "text-grey-900",
      },
      emptyMessage: {
        class: "text-grey-900 text-sm",
      },
    },
    textarea: {
      root: { class: "border border-grey-400 rounded h-9 py-2 px-4" },
    },
    tabpanel: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headerTitle: (instance: any) => ({
        class: [
          instance.tabpanel.context.active
            ? "font-semibold text-green"
            : "font-normal text-black",
        ],
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headerAction: (instance: any) => ({
        class: [
          instance.tabpanel.context.active ? "!border-green" : "",
          "focus:!shadow-none",
        ],
      }),
    },
    tabview: {
      panelContainer: {
        class: ["!p-0 !mt-7.5"],
      },
    },
    message: {
      root: ({ props }: { props: MessageProps }) => {
        return {
          class: [
            "w-full !border !m-0",
            props.severity === "info"
              ? "!bg-blue-100 !border !border-l !border-blue-500"
              : "",
          ],
        };
      },
      wrapper: () => {
        return {
          class: ["!p-3.5"],
        };
      },
      icon: ({ props }: { props: MessageProps }) => {
        return {
          class: [props.severity === "info" ? "mr-4" : ""],
        };
      },
      text: ({ props }: { props: MessageProps }) => {
        return {
          class: [
            props.severity === "info" ? "2xl:max-w-[1377px]" : "",
            "text-black 2xl:!text-sm xl:!text-[13px]",
          ],
        };
      },
    },
    selectButton: {
      root: () => ({
        class: ["flex flex-row !gap-x-2.5"],
      }),
      button: ({ context }: { context: SelectButtonContext }) => ({
        class: [
          "!border-r !border-solid !rounded focus:!shadow-none  h-full",
          "2xl:py-2.5 2xl:px-2.5 xl:py-1.5 xl:px-2.5",
          context.active ? "!bg-green !border-green" : "!border-grey-400",
        ],
      }),
      label: ({ context }: { context: SelectButtonContext }) => ({
        class: [
          "!text-grey-900 !text-sm",
          "2xl: !text-sm xl: !text-sm",
          context.active ? "!text-white !font-bold" : "!font-normal",
        ],
      }),
    },

    calendar: {
      input: {
        class: [
          "!border-r-0 !border-grey-400 hover:!border-grey-400 focus:!shadow-none h-9 !rounded-s-md !rounded-e-none",
        ],
      },
      timePicker: {
        class: "bg-white text-grey-900 h-max",
      },
      container: {
        class: "h-max",
      },
      dropdownButton: {
        root: {
          class: ["!bg-white !border-1 !border-l-0 !border-grey-400 h-9"],
        },
      },
      hourPicker: {},
      separatorContainer: {
        class: "mx-4",
      },
    } as PTOptions<CalendarPassThroughOptions>,
  },
};
