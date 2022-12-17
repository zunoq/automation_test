<template>
  <form class="">
    <input
      class="body2"
      v-for="(n, index) in code"
      :key="index"
      type="number"
      pattern="\d*"
      :id="'input_' + index"
      maxlength="1"
      v-model="code[index]"
      @input="handleInput"
      @keypress="isNumber"
      @keydown.delete="handleDelete"
      @paste="onPaste"

    />
  </form>
</template>
<script lang="ts" setup>
let code: string[] = Array(6);
let dataFromPaste: string[] | undefined;
const keysAllowed: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];
const emit = defineEmits(['handleInput', 'digitsChange'])
function isNumber(event: Event) {

  (event.currentTarget as HTMLInputElement).value = '';
  const keyPressed: string = (event as KeyboardEvent).key;
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  }
}
function handleInput(event: Event) {
  const inputType = (event as InputEvent).inputType;
  let currentActiveElement = event.target as HTMLInputElement;
  if (inputType === 'insertText')
    (currentActiveElement.nextElementSibling as HTMLElement)?.focus();
  if (inputType === 'insertFromPaste' && dataFromPaste) {
    for (const num of dataFromPaste) {
      let id: number = parseInt(currentActiveElement.id.split('_')[1]);
      currentActiveElement.value = num;
      code[id] = num;
      if (currentActiveElement.nextElementSibling) {
        currentActiveElement =
          currentActiveElement.nextElementSibling as HTMLInputElement;
        (currentActiveElement.nextElementSibling as HTMLElement)?.focus();
      }
    }
  }
  emit('digitsChange', code)
}

function handleDelete(event: Event) {
  //keydown event = move to previous element then only delete number
  let value = (event.target as HTMLInputElement).value;
  let currentActiveElement = event.target as HTMLInputElement;
  if (!value)
    (currentActiveElement.previousElementSibling as HTMLElement)?.focus();
}

function onPaste(event: Event) {
  dataFromPaste = (event as ClipboardEvent).clipboardData
    ?.getData('text')
    .trim()
    .split('');
  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) event.preventDefault();
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  gap: 18px;
}
input[type="number"] {
  width: calc(100%/6);
  height: 56px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #919eab52;
  border-radius: 8px;
  font-family: 'Public Sans Regular', sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  /*caret-color: transparent !important;*/
}
textarea:focus,input:focus {
  outline: none;
  border: 1px solid #212b36;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
@media only screen and (max-width: 1080px) {
  input[type="number"] {
    width: calc(100%/6);
  }
}
@media only screen and (max-width: 600px) {
  input[type="number"] {
    width: calc(100%/6);
  }
}
@media only screen and (max-width: 500px) {
  form {
    gap: 8px;
  }
  input[type="number"] {
    width: calc(100%/6);
  }
}


</style>
