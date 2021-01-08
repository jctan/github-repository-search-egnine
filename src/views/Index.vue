<template>
  <v-container style="max-width: 1200px">
    <Header title="Github Repository Search Engine" />
    <SearchEngine />
  </v-container>
</template>

<script>
import Header from "@/components/Header.vue";
import SearchEngine from "@/components/SearchEngine.vue";

export default {
  name: "index",
  components: {
    Header,
    SearchEngine
  }
};
</script>
