<template>
  <div class="home">
    <template v-if="!user">
      <button @click="authUser()">Login</button>
    </template>

    <template v-else> 
      <div class="grid gap-4 md:grid-cols-2 xs:grid-cols-6">
        <div v-for="pokemon in party" class="flex p-6">
          <div class="flex-none w-44 relative">
            <img
              v-if="pokemon.sprites"
              :src="pokemon.sprites.front_default"
              alt=""
              class="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          <form class="flex-auto pl-6">
            <div class="flex flex-wrap items-baseline">
              <div class="text-4xl leading-7 font-bold text-purple-600">
                {{ pokemon.nickname }}
              </div>
            </div>
            <div class="flex items-baseline my-8">
              <p class="capitalize">{{ pokemon.name }}<br> Level {{pokemon.level}}</p>
            </div>
            <div class="flex space-x-3 mb-4 text-sm font-semibold">
              <div class="flex-auto flex space-x-3">
                <button
                  class="pb-2 pt-2 w-1/2 flex items-center justify-center rounded-full bg-purple-700 text-white"
                  type="submit"
                >
                  Dead!
                </button>
                <button
                  class="pb-2 pt-2 w-1/2 flex items-center justify-center rounded-full bg-purple-50 text-purple-700"
                  type="button"
                >
                  revive
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div v-if="addModal"
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
            <p class="font-semibold text-gray-600">Cancel</p>
            <button  v-on:click="addPokemonToTeam"
              class="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <h1>Available points: {{ formattedDistance(bankedPoints) }}</h1>
      <p v-for="run in runs">
        {{ formattedDistance(run.distance) }} km
        <span v-if="run.cashedInRun">CASHED</span>
      </p>
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
      const runs = await strava.athlete.listActivities({
        access_token: this.user.access_token,
      });
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
      "graveyard",
      "pokemon",
    ]),
  },
};
</script>
