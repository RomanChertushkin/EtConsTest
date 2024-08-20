<template>
    <nav>
        <ul>
            <li v-for="link in links" :key="link.name">
                <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

interface RouteLink {
    name: string;
    path: string;
}

export default defineComponent({
    name: 'RouterLinks',
    setup() {
        const router = useRouter();

        const links = computed<RouteLink[]>(() =>
            router.getRoutes().map(route => ({
                name: route.name as string,
                path: route.path
            }))
        );

        console.log(links)

        return {
            links
        };
    }
});
</script>

<style lang="scss">
ul {
    
}
</style>