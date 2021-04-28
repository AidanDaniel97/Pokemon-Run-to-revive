<template>
  <div class="home">
    <template v-if="!user">
      <button @click="authUser()">Login</button>
    </template>

    <template v-else>
      <div class="container mt-4">
        <div class="columns is-mobile is-centered">
          <div class="column is-half" v-for="pokemon in party">
            <div class="card">
              <div class="card-image">
                <figure class="image is-128x128 container">
                  <img
                    v-if="pokemon.sprites"
                    :src="pokemon.sprites.front_default"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">
                      <span v-if="pokemon.isDead" class="tag is-danger is-light"
                        >Dead</span
                      >
                      {{ pokemon.nickname }}
                    </p>
                    <p class="subtitle is-6">{{ pokemon.name }}</p>
                    <!-- <p class="subtitle is-6">Revived {{pokemon.reviveCount}}</p> -->
                  </div>
                </div>
              </div>

              <footer class="card-footer">
                <a
                  href="#"
                  v-if="pokemon.isDead"
                  @click="markAsRevived(pokemon)"
                  class="card-footer-item"
                  >Revive</a
                >
                <a
                  href="#"
                  v-else
                  @click="markAsDead(pokemon)"
                  class="card-footer-item"
                  >Set as dead</a
                >
                <!-- <a href="#" class="card-footer-item">Edit</a>  -->
              </footer>
            </div>
          </div>
        </div>

        <div class="flex flex-col h-screen justify-between">
          <main class="mb-auto h-10">
            <div
              v-if="addModal"
              class="absolute w-full top-0 flex justify-center h-screen items-center bg-gray-200 antialiased"
            >
              <div
                class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl"
              >
                <div
                  class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
                >
                  <p class="font-semibold text-gray-800">Add to team</p>
                  <svg
                    @click="addModal = false"
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
                <div class="flex flex-col px-6 py-5 bg-gray-50">
                  <div
                    class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5"
                  >
                    <div class="w-full sm:w-1/2">
                      <p class="mb-2 font-semibold text-gray-700">Pokemon</p>
                      <Dropdown
                        autocomplete="off"
                        :options="pokemon"
                        :disabled="false"
                        v-on:selected="validatePokemon"
                        placeholder="Please select an option"
                      >
                      </Dropdown>
                    </div>
                    <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
                      <p class="mb-2 font-semibold text-gray-700">Nickname</p>
                      <input type="text" v-model="pokemonNickname" />
                    </div>
                    <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
                      <p class="mb-2 font-semibold text-gray-700">Level</p>
                      <input type="text" v-model="pokemonLevel" />
                    </div>
                  </div>
                  <hr />
                </div>
                <div
                  class="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
                >
                  <p
                    class="font-semibold text-gray-600"
                    v-on:click="addModal = false"
                  >
                    Cancel
                  </p>
                  <button
                    v-on:click="addPokemonToTeam"
                    class="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </main>

          <footer class="h-10 bg-blue-500">
            <div class="footer">
              <h1>Available points: {{ formattedDistance(bankedPoints) }}</h1>
              <button v-on:click="addModal = true">Add party</button>
            </div>
          </footer>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { default as strava, Strava } from "strava-v3";
import { mapState } from "vuex";
import axios from "axios";
import Dropdown from "vue-simple-search-dropdown";

strava.config({
  access_token: process.env.VUE_APP_STRAVA_ACCESS_TOKEN,
  client_id: process.env.VUE_APP_STRAVA_CLIENT_ID,
  client_secret: process.env.VUE_APP_STRAVA_CLIENT_SECRET,
  redirect_uri: process.env.VUE_APP_STRAVA_REDIRECT_URI,
});

export default {
  name: "Home",
  data() {
    return {
      pokemonSearch: "",
      selectedPokemon: null,
      pokemonNickname: null,
      pokemonLevel: null,
      addModal: false,
    };
  },
  components: {
    Dropdown,
  },
  async mounted() {
    if (this.urlCode && !this.user) {
      // Strava returns code after auth
      var user = await strava.oauth.getToken(this.urlCode);
      this.$store.commit("setUser", user);
      window.location.href = "/";
    } else {
      if (this.user) {
        this.getRuns();
      }
    }
  },
  methods: {
    markAsDead(pokemon) {
      this.$store.commit("markAsDead", pokemon);
    },
    markAsRevived(pokemon) {
      this.$store.commit("markAsRevived", pokemon);
    },
    addPokemonToTeam() {
      axios
        .get(
          "https://pokeapi.co/api/v2/pokemon/" +
            this.selectedPokemon.name.toLowerCase()
        )
        .then(
          function(response) {
            this.$store.commit("addPokemonToParty", {
              data: response.data,
              nickname: this.pokemonNickname,
              level: this.pokemonLevel,
            });
            this.selectedPokemon = null;
            this.pokemonNickname = null;
            this.pokemonLevel = null;
            this.addModal = false;
          }.bind(this)
        );
    },
    validatePokemon(selection) {
      this.selectedPokemon = selection;
    },
    async authUser() {
      const authURL = await strava.oauth.getRequestAccessURL({
        scope: "activity:read",
      });
      window.location.href = authURL;
    },
    async getRuns() {
      console.log("Getting runs");
      const runs = await strava.athlete.listActivities(
        {
          access_token: this.user.access_token,
        },
        function(err, payload, limits) {
          if (!err) {
            console.log(payload);
          } else {
            // refresh tokens are for suckers
            this.$store.commit("setUser", null);
          }
        }.bind(this)
      );
      this.$store.commit("setRuns", runs);
    },
    formattedDistance(totalMetres) {
      // takes metres and converts to km
      return (totalMetres / 1000).toFixed(2);
    },
  },
  computed: {
    urlCode: function() {
      var url_string = window.location; //window.location.href
      var url = new URL(url_string);
      return url.searchParams.get("code");
    },
    ...mapState([
      // map this.count to store.state.count
      "user",
      "runs",
      "bankedPoints",
      "party",
      "pokemon",
    ]),
  },
};
</script>
