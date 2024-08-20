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

        return {
            links
        };
    }
});
</script>

<style lang="scss">
nav ul {
  list-style-type: none;
  padding: 0; 
  margin: 0; 
  display: flex; 
  gap: 0px; 
}

nav li {
  margin: 0; 
}

nav li a {
  text-decoration: none; 
  color: white; 
  padding: 5px 12px; 
  border-radius: 4px; 
  transition: background-color 0.3s; 
}

nav li a:hover {
  background-color: #ddd; 
  color: black;
}

</style>