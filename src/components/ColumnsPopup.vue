<template>
    <div v-if="isVisible" ref="popup" class="popup-container" :style="popupStyles">
        <div class="popup-content">
            <h3>Выберите колонки для поиска:</h3>
            <div v-for="param in localSearchParams" :key="param.name" class="checkbox-item">
                <Checkbox v-model="param.checked" :binary="true" />
                <label :for="param.name">{{ param.name.toLocaleUpperCase() }}</label>
            </div>
        </div>
        <div class="popup-footer">
            <Button label="Сохранить" @click="saveAndClose"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

interface SearchParam {
    name: string;
    checked: boolean;
}

const props = defineProps<{
    modelValue: SearchParam[];
    isVisible: boolean;
    buttonRef: HTMLElement | null;
}>();

const emit = defineEmits(['update:modelValue', 'hide']);

const popup = ref<HTMLElement | null>(null);

const localSearchParams = ref<SearchParam[]>([]);

const emitUpdate = () => {
    emit('update:modelValue', [...localSearchParams.value]);
};

const saveAndClose = (): void => {
    emitUpdate();
    emit('hide');
}

const popupStyles = ref({});

const handleClickOutside = (event: MouseEvent): void => {
    if (props.buttonRef && popup.value && !popup.value.contains(event.target as Node) && !props.buttonRef.contains(event.target as any)) {
        localSearchParams.value = JSON.parse(JSON.stringify(props.modelValue));
        emit('hide');
    }
};

onMounted(() => {
    localSearchParams.value = JSON.parse(JSON.stringify(props.modelValue));
    if (props.buttonRef) {
        const buttonRect = props.buttonRef.getBoundingClientRect();
        popupStyles.value = {
            top: `${buttonRect.bottom + window.scrollY}px`,
            left: `${buttonRect.left + window.scrollX}px`,
        };
    }
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.popup-container {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-top: 40px;
}

.popup-content {
    display: flex;
    flex-direction: column;

    h3 {
        padding-bottom: 10px;
    }
}

.popup-footer {
    display: flex;
    justify-content: end;
}

.checkbox-item {
    margin-bottom: 8px;
    display: flex;
    align-items: center;

    label {
        padding-left: 10px;
    }
}
</style>
