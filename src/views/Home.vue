  
<template>
    <div class="home">
        <template v-if="!user">
            <button @click="authUser()">Login</button>
        </template>

        <template v-else>

           <Dropdown
    :options="pokemon"  
    :disabled="false" 
    :selected="validatePokemon"
    placeholder="Please select an option">
</Dropdown>
{{selectedPokemon}}
            <button v-on:click="searchPokemon">Search</button>

            <h1>Pokemon</h1>
            <div v-for="pokemon in party">
                <img v-if="pokemon.sprites" :src="pokemon.sprites.front_default">
            </div>

            <h1>Available points: {{formattedDistance(bankedPoints)}}</h1>
            <p @click="cashInRun(run)" v-for="run in runs">{{formattedDistance(run.distance) }} km <span v-if="run.cashedInRun">CASHED</span> </p>
        </template>

    </div>
</template>

<script>
import { default as strava, Strava } from "strava-v3";
import { mapState } from "vuex";
import axios from 'axios';
import Dropdown from 'vue-simple-search-dropdown';

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
            pokemonSearch: '',
            selectedPokemon: null
        }
    },
    components:{
        Dropdown
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
        searchPokemon (){
            console.log(this.pokemonSearch) 

             axios
            .get('https://pokeapi.co/api/v2/pokemon/' + this.pokemonSearch.toLowerCase())
            .then(function(response){
                this.$store.commit("addPokemonToParty", response.data);
            }.bind(this)); 
        },
        validatePokemon (selection){
            this.selectedPokemon = selection; 
        },
        cashInRun(run) {
            this.$store.commit("cashInRun", { value: !run.cashedInRun, run: run });
        },
        async authUser() {
            const authURL = await strava.oauth.getRequestAccessURL({ scope: "activity:read" });
            window.location.href = authURL;
        },
        async getRuns() {
            console.log("Getting runs");
            const runs = await strava.athlete.listActivities({ access_token: this.user.access_token });
            this.$store.commit("setRuns", runs);
        },
        formattedDistance (totalMetres) { // takes metres and converts to km
            return (totalMetres / 1000).toFixed(2)
        }
    },
    computed: {
        urlCode: function () {
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
            "pokemon"
        ]),
        totalKM: function () {
            var totalMetres = 0;
            for (var run in this.runs) {
                var currRun = this.runs[run];
                if(!currRun.cashedInRun){
                    totalMetres = totalMetres + currRun.distance;
                }
                
            }
            return this.formattedDistance(totalMetres);
        },
    },
};
</script>