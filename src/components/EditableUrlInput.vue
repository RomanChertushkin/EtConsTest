
<template>
    <div class="input--container">
        <label for="username">Url:</label>
        <InputText 
        v-if="!state" 
        id="inputUrl" 
        ref="inputUrl"
        :placeholder="props.placeholder"
        @blur="fetchPageTitle" 
        @keyup.enter="fetchPageTitle" 
        v-model="value" 
        aria-describedby="url-edit" />
        <div v-else>
            <a :href="value">
                {{ urlTitle }}
            </a>
            <i class="pi pi-pencil icon--paddings" @click="changeState"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { defineProps, withDefaults, defineEmits } from 'vue';

interface Props {
  placeholder: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'https://',
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const value = ref<string>('');
const state = ref<boolean>(false);
const urlTitle = ref<string | null>(null);
const inputUrl = ref<HTMLInputElement | null>(null);

const fetchPageTitle = async function (): Promise<void> {
    if (value.value == '') {
        return;
    }

    try {
        const response: Response = await fetch(value.value as string);

        const text: string = await response.text();

        const parser: DOMParser = new DOMParser();
        const doc: Document = parser.parseFromString(text, "text/html");

        const titleElement: HTMLTitleElement | null = doc.querySelector("title");
        urlTitle.value = titleElement ? titleElement.innerText : "No title found";

        state.value = true;

        emit('update:modelValue', value.value);
    } catch (error) {
        urlTitle.value = "Error fetching page title";
        state.value = false;
    }
}

const changeState = (): void => {
    state.value = false;
    inputUrl.value?.focus();

    console.log(inputUrl.value)
}

</script>

<style lang="scss">
.input--container {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
        font-weight: 600;
    }

    #inputUrl {
        border: solid var(--color-border) 1px;
        padding: 5px;
        background-color: var(--color-background-soft);

        &:hover {
            border: solid var(--color-border--input-hover) 1px; 
        }
    }
}

.icon--paddings {
    padding-left: 10px;
    cursor: pointer;
}
</style>

