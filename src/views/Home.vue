<template>
  <div class="home">

      <h1> {{bankedPoints.toFixed(1)}}</h1>
    <template v-if="!user">
      <button @click="authUser()">Login</button>
    </template>

    <template v-else>
      <div class="container mt-4">
        <div class="columns is-mobile is-centered is-multiline">
          <div class="column is-half" v-for="pokemon in pokemonList">
            <div class="card">
              <div class="card-image">
                <figure class="image is-128x128 container">
                  <img
                    @dblclick.stop="removePokemonFromParty(pokemon)"
                    v-if="pokemon.sprites"
                    :src="pokemon.sprites.front_default"
                    :class="{'is-dead': pokemon.isDead}"
                    class="pokemon-sprite"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content px-1 py-2">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4"> 
                      {{ pokemon.nickname }}
                      <span v-if="pokemon.isDead">(RIP)</span>
                    </p>
                    <p class="subtitle is-6"><span  class="tag is-info is-light"
                        >lvl {{pokemon.level}}</span
                      > {{ pokemon.name }}  
                      <br><blockquote v-if="pokemon.isDead"><i>"{{pokemon.obituary}}"</i></blockquote></p> 
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
                <a
                  href="#" 
                  @click="setLevel(pokemon)"
                  class="card-footer-item"
                  >Set level</a
                >
                <!-- <a href="#" class="card-footer-item">Edit</a>  -->
              </footer>
            </div>
          </div>
        </div>
      </div>

      <div class="control-section">
        <button class="button add-btn" v-on:click="addModal = true">
          <span class="icon is-small">
            <span>+</span>
          </span>
        </button>

        <button class="button add-btn" v-on:click="showDead = !showDead">
          <span class="icon is-small">
            <svg v-if="!showDead" version="1.0" xmlns="http://www.w3.org/2000/svg" width="682.667" height="682.667" viewBox="0 0 512 512"><path d="M233 1.2c-35.5 3.3-75.3 17.5-104.5 37.1-18.6 12.5-38.6 30.7-52 47.1-27.7 34.2-45 75.1-50.7 120-.9 7.3-1.3 27.8-1.3 75.1 0 61.7.1 65.2 1.9 68.8 1.5 3.1 11.8 11.3 53.2 42.8l51.3 38.9.3 33.8c.3 37.9.2 37.2 8.1 43.6l3.9 3.1h13.7c12.8 0 14-.2 17.2-2.4 1.9-1.3 4.6-4 5.9-6 2.3-3.4 2.5-4.6 3-21.1.3-10.9 1-18.3 1.7-19.6 4.1-7.2 15.5-7.2 19.5-.1.9 1.4 1.5 8.2 1.8 19.2.6 19.1 1.2 21.1 8.3 26.9 3.5 2.8 4.6 3.1 10.7 3.1s7.2-.3 10.7-3.1c7.2-5.8 7.7-7.7 8.3-27.7l.5-17.9 3.3-2.9c2.6-2.4 4.1-2.9 8.2-2.9s5.6.5 8.2 2.9l3.3 2.9.5 17.9c.6 20 1.1 21.9 8.3 27.7 3.5 2.8 4.6 3.1 10.7 3.1s7.2-.3 10.7-3.1c7.2-5.8 7.7-7.7 8.3-27.7l.5-17.9 3.3-2.9c5.3-4.8 14.1-3.5 17.5 2.5.7 1.3 1.4 8.8 1.7 19.7.5 16.5.6 17.8 2.9 21.1 1.3 1.9 4 4.6 5.9 5.9 3.3 2.2 4.4 2.4 17.3 2.4h13.7l3.9-3.1c7.9-6.4 7.7-5.8 8.3-43.8l.5-34 50.5-38.2c40.8-31 51-39.1 53-42.6l2.5-4.3V279c0-59-.2-67.8-1.8-78-5.4-34.1-15.6-62.9-32.1-90-16.6-27.2-42.3-54-68.8-71.8C340.6 9.6 286.7-3.9 233 1.2zm-60.5 215.3c17.9 3.7 35 17 43.3 33.5 7 13.9 8.7 26.8 5.6 41.7-4.7 23-20.1 40.1-42.9 47.9-10 3.4-25.2 3.8-35.4 1-22.2-6.1-39.7-23.5-45.7-45.6-2.8-10.3-2.4-25.5 1-35.5 10.8-31.7 41.9-49.7 74.1-43zm193.2.1c23.9 4.9 42.5 22.6 48.9 46.5 2.2 8.4 2.2 23.3-.1 31.9-5.7 21.8-23.5 39.6-45.5 45.6-10.3 2.8-25.5 2.4-35.5-1-25.8-8.8-42.7-30.6-44.2-57-1-18.7 5.4-35.4 18.6-48.7 15.7-15.6 36.3-21.8 57.8-17.3zM262.9 337.7c4 3.7 22.1 37 22.1 40.6 0 1.5-.7 4.2-1.6 5.8-2.6 5.2-6.1 5.9-27.6 5.9-21.1 0-24.9-.8-27.5-6-2.5-5-1.5-8.1 8.2-26 10.8-19.8 13.6-23 19.5-23 2.9 0 4.7.7 6.9 2.7z"/></svg>
            <svg v-else version="1.0" xmlns="http://www.w3.org/2000/svg" width="458.667" height="458.667" viewBox="0 0 344 344"><path d="M154.5 29.6c-43.7 6.6-80.4 29.8-103.2 65.3C42.2 109.1 32 135 32 144c0 5 3.3 9.8 8.3 12 3.9 1.8 6.9 2 44.1 2 46.7 0 44.9.3 52.6-10.2 5.3-7.3 12.4-13 20-16 7.9-3.1 22.2-3.1 30.3.1 7.4 2.9 15.1 9.1 20 16.2 2.2 3.2 5.4 6.3 7.9 7.6 4.1 2.3 4.5 2.3 44.2 2.3 37.2 0 40.4-.2 44.3-1.9 8.3-3.8 9.8-10.2 5.9-24.2-2.9-10.1-11-27.9-16.9-37-20.4-31.8-54.3-55.2-91.7-63.4-7.3-1.6-39.7-2.9-46.5-1.9z"/><path d="M164.6 159.9c-4.3 2.9-6.6 7-6.6 12.1 0 2.7.8 5.6 1.9 7.4 2.9 4.3 7 6.6 12.1 6.6 14.2 0 19.3-18.2 7.4-26.1-3.8-2.5-11-2.5-14.8 0zM40.3 188c-5 2.2-8.3 7-8.3 12 0 5.9 4.8 20.8 10.5 32.7 7.5 15.7 16.2 28 28.5 40.3 20.3 20.3 44.4 33.4 73 39.6 12 2.6 43.9 2.7 55.8.1 28.5-6.1 53.1-19.5 73.2-39.7 12.3-12.3 21.1-24.7 28.5-40.3 5.7-11.9 10.5-26.8 10.5-32.7 0-5-3.3-9.8-8.3-12-3.9-1.8-6.9-2-44.1-2-38.3 0-40.1.1-44.2 2.1-2.9 1.3-5.3 3.6-7.4 7-9.2 14.2-26.4 22-42.6 19.2-12.1-2.1-22.9-9.2-29.4-19.2-2.1-3.4-4.5-5.7-7.4-7-4.1-2-5.9-2.1-44.2-2.1-37.2 0-40.2.2-44.1 2z"/></svg>
          </span>
        </button>
      </div>
    </template>

    <div class="modal" :class="{ 'is-active': addModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <form @submit="addPokemonToParty">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control has-text-centered">
                    <Dropdown
                      autocomplete="off"
                      :options="pokemon"
                      :disabled="false"
                      v-on:selected="validatePokemon"
                      placeholder="Please select an option"
                    >
                    </Dropdown>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Nickname</label>
                  <div class="control">
                    <input
                      class="input is-success"
                      type="text"
                      maxlength="12"
                      placeholder="Username"
                      v-model="pokemonNickname"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Level</label>
                  <div class="control">
                    <input
                      class="input is-success"
                      type="number"
                      max="100"
                      placeholder="Level"
                      v-model="pokemonLevel"
                    />
                  </div>
                </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" type="submit">Add</button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-link is-light"
                      v-on:click="addModal = false"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button
        v-on:click="addModal = false"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>





    <div class="modal" :class="{ 'is-active': deadModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <form @submit="markAsDeadConfirm">
                
                <div class="field">
                  <label class="label">Obituary</label>
                  <div class="control">
                    <input
                      class="input is-success"
                      type="text" 
                      placeholder="Obituary"
                      v-model="deadComment"
                    />
                  </div>
                </div>


                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" type="submit">Confirm</button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-link is-light"
                      v-on:click="markAsDeadClose"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button
        v-on:click="markAsDeadClose"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
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
      showDead: false,
      deadPokemon: null,
      deadComment: "",
      deadModal: null
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
        this.deadModal = true
        this.deadPokemon = pokemon
    },
    markAsDeadClose(){ 
        this.deadModal = false
        this.deadPokemon = null
        this.deadComment = ""
    },
    markAsDeadConfirm(e){  
      e.preventDefault();
      this.$store.commit("markAsDead", {pokemon: this.deadPokemon, comment: this.deadComment});
      this.markAsDeadClose()
    },
    markAsRevived(pokemon) {
      this.$store.commit("markAsRevived", pokemon);
    },
    removePokemonFromParty(pokemon) {
      this.$store.commit("removePokemonFromParty", pokemon);
    },
    addPokemonToParty(e) {
      e.preventDefault();
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
  },
  computed: {
    urlCode: function() {
      var url_string = window.location; //window.location.href
      var url = new URL(url_string);
      return url.searchParams.get("code");
    },
    pokemonList: function() {
      if (this.showDead) {
        return this.party.filter((x) => x.isDead);
      } else {
        return this.party.filter((x) => !x.isDead);
      }
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
