<template>
  <li
    :class="[!isUser ? 'flex ' : '', 'pl-10 relative py-px']"
    :tabindex="tabindex"
    @keyup.esc="returnToChatWindow"
    @keydown.prevent.up="prevElement($event)"
    @keydown.prevent.shift.tab="prevElement($event)"
    @keydown.prevent.down="nextElement($event)"
    @keydown.prevent.exact.tab="nextElement($event)"
    aria-live="polite"
  >
    <img
      v-if="isLastMessage"
      ref="chatReaderIcon"
      :src="icons[senderIcon]"
      alt=""
      class="h-6 w-10 absolute left-0 bottom-0"
    />
    <span class="sr-only">
      {{ (isUser ? $t("you") : senderName) + $t("said") + text }}
    </span>
    <span
      :aria-hidden="true"
      :class="[
        !isUser
          ? 'bg-gray-infolt mr-10'
          : 'bg-blue-primary text-white float-right ml-10',
        isLastMessage && isUser
          ? 'userMessage'
          : isLastMessage
          ? 'botMessage'
          : '',
        ' p-3 rounded-3xl max-w-xs md:max-w-xl min-w-7/2r break-words',
      ]"
    >
      {{ text }}
    </span>
  </li>
</template>
<script>
import icons from "../../assets/icons.js";
export default {
  name: "ConversationMessage",
  emits: ["return-to-chat-window"],
  props: {
    senderIcon: String,
    isUser: Boolean,
    isLastMessage: Boolean,
    text: String,
    tabindex: Number,
    senderName: String,
  },
  setup(_, context) {
    const returnToChatWindow = () => context.emit("return-to-chat-window");
    const nextElement = (event) => event.target.nextElementSibling?.focus();
    const prevElement = (event) => event.target.previousElementSibling?.focus();
    return {
      returnToChatWindow,
      nextElement,
      prevElement,
      icons,
    };
  },
};
</script>
<style scoped>
/* Chat bubble animations*/

/* Animation commented out since its janky with the scroll to bottom of chat messages.*/
/* .userMessage,
.botMessage {
  animation: slideUp 0.1s ease-in;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
  }
  to {
    transform: none;
  }
} */
</style>
