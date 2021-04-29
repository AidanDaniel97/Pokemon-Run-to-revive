import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bankedPoints: 0,
    runs: [],
    user: null,
    party: [], 
    pokemon: [
      {
          "name": "Turtwig",
          "id": "0"
      },
      {
          "name": "Grotle",
          "id": "1"
      },
      {
          "name": "Torterra",
          "id": "2"
      },
      {
          "name": "Chimchar",
          "id": "3"
      },
      {
          "name": "Monferno",
          "id": "4"
      },
      {
          "name": "Infernape",
          "id": "5"
      },
      {
          "name": "Piplup",
          "id": "6"
      },
      {
          "name": "Prinplup",
          "id": "7"
      },
      {
          "name": "Empoleon",
          "id": "8"
      },
      {
          "name": "Starly",
          "id": "9"
      },
      {
          "name": "Staravia",
          "id": "10"
      },
      {
          "name": "Staraptor",
          "id": "11"
      },
      {
          "name": "Bidoof",
          "id": "12"
      },
      {
          "name": "Bibarel",
          "id": "13"
      },
      {
          "name": "Kricketot",
          "id": "14"
      },
      {
          "name": "Kricketune",
          "id": "15"
      },
      {
          "name": "Shinx",
          "id": "16"
      },
      {
          "name": "Luxio",
          "id": "17"
      },
      {
          "name": "Luxray",
          "id": "18"
      },
      {
          "name": "Abra",
          "id": "19"
      },
      {
          "name": "Kadabra",
          "id": "20"
      },
      {
          "name": "Alakazam",
          "id": "21"
      },
      {
          "name": "Magikarp",
          "id": "22"
      },
      {
          "name": "Gyarados",
          "id": "23"
      },
      {
          "name": "Budew",
          "id": "24"
      },
      {
          "name": "Roselia",
          "id": "25"
      },
      {
          "name": "Roserade",
          "id": "26"
      },
      {
          "name": "Zubat",
          "id": "27"
      },
      {
          "name": "Golbat",
          "id": "28"
      },
      {
          "name": "Crobat",
          "id": "29"
      },
      {
          "name": "Geodude",
          "id": "30"
      },
      {
          "name": "Graveler",
          "id": "31"
      },
      {
          "name": "Golem",
          "id": "32"
      },
      {
          "name": "Onix",
          "id": "33"
      },
      {
          "name": "Steelix",
          "id": "34"
      },
      {
          "name": "Cranidos",
          "id": "35"
      },
      {
          "name": "Rampardos",
          "id": "36"
      },
      {
          "name": "Shieldon",
          "id": "37"
      },
      {
          "name": "Bastiodon",
          "id": "38"
      },
      {
          "name": "Machop",
          "id": "39"
      },
      {
          "name": "Machoke",
          "id": "40"
      },
      {
          "name": "Machamp",
          "id": "41"
      },
      {
          "name": "Psyduck",
          "id": "42"
      },
      {
          "name": "Golduck",
          "id": "43"
      },
      {
          "name": "Burmy",
          "id": "44"
      },
      {
          "name": "Wormadam",
          "id": "45"
      },
      {
          "name": "Mothim",
          "id": "46"
      },
      {
          "name": "Wurmple",
          "id": "47"
      },
      {
          "name": "Silcoon",
          "id": "48"
      },
      {
          "name": "Beautifly",
          "id": "49"
      },
      {
          "name": "Cascoon",
          "id": "50"
      },
      {
          "name": "Dustox",
          "id": "51"
      },
      {
          "name": "Combee",
          "id": "52"
      },
      {
          "name": "Vespiquen",
          "id": "53"
      },
      {
          "name": "Pachirisu",
          "id": "54"
      },
      {
          "name": "Buizel",
          "id": "55"
      },
      {
          "name": "Floatzel",
          "id": "56"
      },
      {
          "name": "Cherubi",
          "id": "57"
      },
      {
          "name": "Cherrim",
          "id": "58"
      },
      {
          "name": "Shellos",
          "id": "59"
      },
      {
          "name": "Gastrodon",
          "id": "60"
      },
      {
          "name": "Heracross",
          "id": "61"
      },
      {
          "name": "Aipom",
          "id": "62"
      },
      {
          "name": "Ambipom",
          "id": "63"
      },
      {
          "name": "Drifloon",
          "id": "64"
      },
      {
          "name": "Drifblim",
          "id": "65"
      },
      {
          "name": "Buneary",
          "id": "66"
      },
      {
          "name": "Lopunny",
          "id": "67"
      },
      {
          "name": "Gastly",
          "id": "68"
      },
      {
          "name": "Haunter",
          "id": "69"
      },
      {
          "name": "Gengar",
          "id": "70"
      },
      {
          "name": "Misdreavus",
          "id": "71"
      },
      {
          "name": "Mismagius",
          "id": "72"
      },
      {
          "name": "Murkrow",
          "id": "73"
      },
      {
          "name": "Honchkrow",
          "id": "74"
      },
      {
          "name": "Glameow",
          "id": "75"
      },
      {
          "name": "Purugly",
          "id": "76"
      },
      {
          "name": "Goldeen",
          "id": "77"
      },
      {
          "name": "Seaking",
          "id": "78"
      },
      {
          "name": "Barboach",
          "id": "79"
      },
      {
          "name": "Whiscash",
          "id": "80"
      },
      {
          "name": "Chingling",
          "id": "81"
      },
      {
          "name": "Chimecho",
          "id": "82"
      },
      {
          "name": "Stunky",
          "id": "83"
      },
      {
          "name": "Skuntank",
          "id": "84"
      },
      {
          "name": "Meditite",
          "id": "85"
      },
      {
          "name": "Medicham",
          "id": "86"
      },
      {
          "name": "Bronzor",
          "id": "87"
      },
      {
          "name": "Bronzong",
          "id": "88"
      },
      {
          "name": "Ponyta",
          "id": "89"
      },
      {
          "name": "Rapidash",
          "id": "90"
      },
      {
          "name": "Bonsly",
          "id": "91"
      },
      {
          "name": "Sudowoodo",
          "id": "92"
      },
      {
          "name": "Mime Jr.",
          "id": "93"
      },
      {
          "name": "Mr. Mime",
          "id": "94"
      },
      {
          "name": "Happiny",
          "id": "95"
      },
      {
          "name": "Chansey",
          "id": "96"
      },
      {
          "name": "Blissey",
          "id": "97"
      },
      {
          "name": "Cleffa",
          "id": "98"
      },
      {
          "name": "Clefairy",
          "id": "99"
      },
      {
          "name": "Clefable",
          "id": "100"
      },
      {
          "name": "Chatot",
          "id": "101"
      },
      {
          "name": "Pichu",
          "id": "102"
      },
      {
          "name": "Pikachu",
          "id": "103"
      },
      {
          "name": "Raichu",
          "id": "104"
      },
      {
          "name": "Hoothoot",
          "id": "105"
      },
      {
          "name": "Noctowl",
          "id": "106"
      },
      {
          "name": "Spiritomb",
          "id": "107"
      },
      {
          "name": "Gible",
          "id": "108"
      },
      {
          "name": "Gabite",
          "id": "109"
      },
      {
          "name": "Garchomp",
          "id": "110"
      },
      {
          "name": "Munchlax",
          "id": "111"
      },
      {
          "name": "Snorlax",
          "id": "112"
      },
      {
          "name": "Unown",
          "id": "113"
      },
      {
          "name": "Riolu",
          "id": "114"
      },
      {
          "name": "Lucario",
          "id": "115"
      },
      {
          "name": "Wooper",
          "id": "116"
      },
      {
          "name": "Quagsire",
          "id": "117"
      },
      {
          "name": "Wingull",
          "id": "118"
      },
      {
          "name": "Pelipper",
          "id": "119"
      },
      {
          "name": "Girafarig",
          "id": "120"
      },
      {
          "name": "Hippopotas",
          "id": "121"
      },
      {
          "name": "Hippowdon",
          "id": "122"
      },
      {
          "name": "Azurill",
          "id": "123"
      },
      {
          "name": "Marill",
          "id": "124"
      },
      {
          "name": "Azumarill",
          "id": "125"
      },
      {
          "name": "Skorupi",
          "id": "126"
      },
      {
          "name": "Drapion",
          "id": "127"
      },
      {
          "name": "Croagunk",
          "id": "128"
      },
      {
          "name": "Toxicroak",
          "id": "129"
      },
      {
          "name": "Carnivine",
          "id": "130"
      },
      {
          "name": "Remoraid",
          "id": "131"
      },
      {
          "name": "Octillery",
          "id": "132"
      },
      {
          "name": "Finneon",
          "id": "133"
      },
      {
          "name": "Lumineon",
          "id": "134"
      },
      {
          "name": "Tentacool",
          "id": "135"
      },
      {
          "name": "Tentacruel",
          "id": "136"
      },
      {
          "name": "Feebas",
          "id": "137"
      },
      {
          "name": "Milotic",
          "id": "138"
      },
      {
          "name": "Mantyke",
          "id": "139"
      },
      {
          "name": "Mantine",
          "id": "140"
      },
      {
          "name": "Snover",
          "id": "141"
      },
      {
          "name": "Abomasnow",
          "id": "142"
      },
      {
          "name": "Sneasel",
          "id": "143"
      },
      {
          "name": "Weavile",
          "id": "144"
      },
      {
          "name": "Uxie",
          "id": "145"
      },
      {
          "name": "Mesprit",
          "id": "146"
      },
      {
          "name": "Azelf",
          "id": "147"
      },
      {
          "name": "Dialga",
          "id": "148"
      },
      {
          "name": "Palkia",
          "id": "149"
      },
      {
          "name": "Manaphy",
          "id": "150"
      },
  ]
  },
  mutations: {
    setRuns(state, runs) { // called from api
      for (var run in runs) {
        var currRun = runs[run] 

        if (!state.runs.find((x) => x.id === currRun.id)) { // if the runs doesnt exist
          // cash in run 
          state.bankedPoints = state.bankedPoints + (currRun.distance / 1000)
          currRun["cashedInRun"] = true;
          // push to runs array
          state.runs.push(currRun);
        }

      }
    },
    setUser(state, user) {
      state.user = user;
    },
    removePokemonFromParty(state, pokemon){
      var index = state.party.findIndex(x => x.partyID === pokemon.partyID)
    },
    addPokemonToParty(state, pokemon){ 
      pokemon.data.nickname = pokemon.nickname
      pokemon.data.level = pokemon.level 
      pokemon.data.partyID = (Math.random() * 1000).toFixed()
      state.party.push(pokemon.data)
    },
    markAsDead(state, deadObj){
      var pokemon = deadObj.pokemon
      var partyIndex = state.party.findIndex(x => x.partyID === pokemon.partyID)
      var currPokemon = state.party[partyIndex]
      Vue.set(currPokemon, 'isDead', true) 
      Vue.set(currPokemon, 'obituary', deadObj.comment) 
    },
    markAsRevived(state, pokemon){
      var partyIndex = state.party.findIndex(x => x.partyID === pokemon.partyID)
      var currPokemon = state.party[partyIndex]
      Vue.set(currPokemon, 'isDead', false)  
      if(currPokemon.reviveCount >= 0){ 
        console.log(currPokemon.reviveCount)
        currPokemon.reviveCount = currPokemon.reviveCount + 1
      }else{
        Vue.set(currPokemon, 'reviveCount', 0) 
      }
 
      state.bankedPoints = state.bankedPoints - currPokemon.level
    },
    cashInRun(state, data) {
      console.log(state.runs);
      state.runs.find((x) => x.id === data.run.id).cashedInRun = data.value;
    },
  },
  getters: {
    runs: (state) => {
      return state.runs.sort(function(a, b) {
        var dateA = new Date(a.start_date),
          dateB = new Date(b.start_date);
        return dateB - dateA;
      });
    },
    user: (state) => {
      return state.user;
    },
    bankedPoints: (state) => {
      return state.bankedPoints;
    },
    pokemon: (state) => {
      return state.pokemon;
    },
    party: (state) => {
      return state.party;
    }, 
  },
  plugins: [new VuexPersistence().plugin],
});
