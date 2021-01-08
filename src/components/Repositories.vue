<template>
  <v-container class="repositories">
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="item in repoItems" :key="item.id">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="12" md="5">
              <h3 class="h6 repo-name">{{ item.name }}</h3>
              <div class="repo-desc">{{ item.description }}</div>
              <a
                :href="item.homepage"
                target="_blank"
                v-show="item.homepage !== ''"
              >
                <div>Home Page</div>
              </a>
            </v-col>

            <v-col cols="12" md="4">
              <a :href="item.html_url" target="_blank">
                <v-btn class="mr-2" color="white">
                  <v-icon class="mr-2">
                    mdi-github
                  </v-icon>
                  Github Repo
                </v-btn>
              </a>
            </v-col>

            <v-col cols="12" md="3">
              <a class="ui tag label" @click="tagFilter(item.language)">
                <v-btn class="pl-md-4 wrench-tool" outlined>
                  <v-icon color="red" dark>
                    mdi-wrench
                  </v-icon>
                  {{ item.language }}
                </v-btn>
              </a>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="5">
              <div class="mb-1">
                Updated at: {{ dateFormatToString(item.updated_at) }}
              </div>
              <div class="mb-0">
                Created at: {{ dateFormatToString(item.created_at) }}
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="mb-1">License: {{ item.license.name || "None" }}</div>
              <div class="mb-0">Forks: {{ item.forks_count }}</div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="mb-1">
                <v-icon color="blue">mdi-star-outline</v-icon> Stars:
                {{ item.stargazers_count }}
              </div>
              <div class="mb-0">
                <v-icon color="blue">mdi-eye-outline</v-icon> Watch:
                {{ item.watchers_count }}
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: "Repositories",
  props: {
    repoItems: Array
  },
  methods: {
    tagFilter(lang) {
      this.$emit("tag-filter-x", lang);
    },
    dateFormatToString(date) {
      const dt = new Date(date);
      return dt.toDateString();
    }
  }
};
</script>
