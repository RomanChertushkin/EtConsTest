
<template>
    <div class="input--container">
        <label for="username">Url:</label>
        <InputText 
        v-if="!state" 
        id="inputUrl" 
        :placeholder="placeholderValue"
        @blur="fetchPageTitle" 
        @keyup.enter="fetchPageTitle" 
        v-model="value" 
        aria-describedby="url-edit" />
        <div v-else>
            <a :href="value">
                {{ urlTitle }}
            </a>
            edited
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';

const placeholderValue = ref<string>('https://');
const value = ref<string>('');

const state = ref<boolean>(false);

const urlTitle = ref<string | null>(null);

async function fetchPageTitle(): Promise<void> {
    try {
        const response: Response = await fetch(value.value as string);

        const text: string = await response.text();

        const parser: DOMParser = new DOMParser();
        const doc: Document = parser.parseFromString(text, "text/html");

        const titleElement: HTMLTitleElement | null = doc.querySelector("title");
        urlTitle.value = titleElement ? titleElement.innerText : "No title found";

        state.value = true;
    } catch (error) {
        urlTitle.value = "Error fetching page title";
        state.value = false;
    }
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
</style>

