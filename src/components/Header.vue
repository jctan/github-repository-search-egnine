<template>
  <v-container class="header">
    <h1 class="headerStyle">
      <v-icon large color="black">
        mdi-github
      </v-icon>
      {{ title }}
    </h1>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>
