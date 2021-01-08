<template>
  <v-container class="searchEngine">
    <v-row>
      <v-col cols="12" sm="6">
        <div class="subtitle">Github Username:</div>
        <div class="red--text" v-show="userNotFound">
          User Not Found! Please try again.
        </div>
        <v-text-field
          @keyup.enter="getUserRepoList($event)"
          placeholder="Enter a Github username..."
          outlined
        >
        </v-text-field>
      </v-col>

      <!-- Display Repository -->
      <v-col cols="12" sm="6">
        <v-card
          class="mx-auto"
          outlined
          mt="1"
          v-show="userRepoNotFound || items.length > 0"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ userInfo.name }}</div>
              <v-list-item-title class="headline mb-1">
                {{ userInfo.login }}
              </v-list-item-title>
              <a :href="userInfo.url" target="_blank">
                <v-list-item-subtitle>{{
                  userInfo.url
                }}</v-list-item-subtitle></a
              >
            </v-list-item-content>
            <a :href="userInfo.url" target="_blank">
              <v-list-item-avatar tile size="80" color="grey" class="mr-1">
                <v-img :src="userInfo.avatar" :alt="userInfo.login"></v-img>
              </v-list-item-avatar>
            </a>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <!-- filter -->
    <v-row v-show="items.length > 0" class="mt-6">
      <v-col cols="12" sm="6" md="4">
        <div
          v-if="filteredCount < 1"
          class="red--text"
          v-show="userRepoNotFound"
        >
          User's Repo Not Found!
        </div>
        <v-text-field
          hide-no-data
          outlined
          clearable
          @keyup.enter="searchRepo($event)"
          placeholder="Find a Repository..."
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-select
          multiple
          outlined
          clearable
          deletable-chips
          chips
          hide-details
          height="50"
          :items="uniqueTags"
          v-model="tagList"
          placeholder="Filter Languages"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Show the list of Repositories-->
    <v-row v-show="items.length > 0">
      <v-col>
        <h2>Showing... {{ filteredCount }} of {{ allCount }} repositories</h2>
      </v-col>
    </v-row>

    <v-row v-show="items.length > 0">
      <Repositories :repoItems="filteredItems" @tag-filter-x="filterByTag" />
    </v-row>
  </v-container>
</template>

<script>
import Repositories from "@/components/Repositories.vue";

export default {
  name: "SearchEngine",
  props: {
    repoItems: Array
  },
  data() {
    return {
      items: [],
      filteredItems: [],
      uniqueTags: [],
      tagList: [],
      userInfo: {},
      userNotFound: false,
      userRepoNotFound: false,
      isLoading: false
    };
  },
  watch: {
    tagList() {
      // Filter repo based on selected tags after a change
      if (this.tagList.length < 1) {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = this.items.filter(i => {
          return this.tagList.includes(i.language);
        });
      }
    }
  },
  computed: {
    filteredCount() {
      return this.filteredItems.length;
    },
    allCount() {
      return this.items.length;
    }
  },
  methods: {
    searchRepo(event) {
      //filter repo by searchRepo on name and description fields
      const searchRepo = event.target.value || "";
      if (searchRepo === "") {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = this.items.filter(i => {
          if (i.name !== null && i.description !== null) {
            return (
              i.name.toLowerCase().includes(searchRepo.toLowerCase()) ||
              i.description.toLowerCase().includes(searchRepo.toLowerCase())
            );
          }
        });
      }
    },
    async getUser(username) {
      //get user
      try {
        const user = await fetch(
          `https://api.github.com/users/${username}`
        ).then(res => res.json());
        if (user.name === null) user.name = "(no name)";
        this.userInfo = {
          name: user.name,
          login: user.login,
          avatar: user.avatar_url,
          url: user.html_url
        };
        return true;
      } catch (error) {
        this.userNotFound = true;
        this.resetRepoList();
        return false;
      }
    },
    async getUserRepoList(event) {
      this.userNotFound = false;
      this.userRepoNotFound = false;
      this.resetRepoList();

      //get repo data
      if (event !== undefined) {
        const username = event.target.value;
        const verifiedUser = this.getUser(username);

        if (verifiedUser) {
          let page = 1;
          let done = false;
          let resultList = [];
          this.isLoading = true;
          while (!done) {
            try {
              let url = new URL(
                `https://api.github.com/users/${username}/repos`
              );
              let params = {
                type: "public",
                affiliation: "owner",
                per_page: 20,
                page: page,
                sort: "created"
              };
              Object.keys(params).forEach(key =>
                url.searchParams.append(key, params[key])
              );
              let result = await fetch(url).then(res => res.json());

              //check the objects are not null or undefined
              result.forEach(function(object) {
                for (let key in object) {
                  if (object[key] == null) object[key] = "";
                }
              });

              if (result.length < 1 && page === 1) {
                //user exists but repos doesn't exist
                this.userRepoNotFound = true;
                this.resetRepoList();
                done = true;
              } else if (result.length < 1) {
                //repos doesn't exist
                this.userRepoNotFound = true;
                done = true;
              } else {
                //showMore if there are more repos
                result.forEach(resultItem => {
                  resultItem.showMore = true;
                  resultItem.page = page;
                  resultItem.per_page = params.per_page;
                });
                resultList = resultList.concat(result);
                page++;
              }
            } catch (error) {
              this.userRepoNotFound = true;
              this.userNotFound = true;
              this.resetRepoList();
              done = true;
            }
          }

          if (resultList.length > 0) {
            this.items = resultList;
            this.filteredItems = resultList;
            //regenerate languages
            this.uniqueTags = this.getUniqueTags();
          }
          this.isLoading = false;
        }
      }
    },
    resetRepoList() {
      this.items = [];
      this.filteredItems = [];
      this.userInfo = {};
    },

    getUniqueTags() {
      //Compile a list of all language tags;
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      // Find unique tags from the items list;
      const allTags = [];
      this.items.map(tag => {
        allTags.push(tag.language);
      });
      const unique = allTags.filter(onlyUnique);

      //Create an options array from unique tags
      const uniqueOptions = [];
      unique.map((tag, index) => {
        uniqueOptions.push({
          key: index,
          text: tag,
          value: tag
        });
      });
      return uniqueOptions;
    },
    filterByTag(tag) {
      // if not selected, add the clicked tagg
      if (!this.tagList.includes(tag)) this.tagList.push(tag);
    }
  },
  components: {
    Repositories
  }
};
</script>
