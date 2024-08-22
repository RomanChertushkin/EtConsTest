<template>
    <DataTable :value="logs" size="small" tableStyle="min-width: 50rem">
        <Column field="log" header="Logs"></Column>
    </DataTable>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useStore } from 'vuex';
import { type LogEntry } from '@/services/logsService';

const store = useStore();

const logs = computed(() => {

    if (store.getters) {
        const logs: LogEntry[] = store.getters.getLogs || [];
        return logs.map((log: LogEntry) => {
            return {
                log: `[${log.time}] ${log.message}`
            }
        })
    }

    return []
});

const getLogs = () => {
    store.dispatch('commitLogs');
};

onMounted((): void => {
    getLogs();
})
</script>

<style>
/* Дополнительные стили */
</style>