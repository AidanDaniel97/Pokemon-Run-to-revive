<template>
    <div class="home">
        <h1 @dblclick.stop="setRunAmount" class="run-bank">Available runs: <strong>{{ bankedPoints.toFixed() }}<small style="font-size:15px">hm</small></strong></h1>
        <h2><strong>@ThatAkwardSmile</strong></h2>
        <template v-if="!user">
            <button @click="authUser()">Login</button>
        </template>

        <template v-else>
            <div class="container mt-4">
                <div class="columns is-mobile is-centered is-multiline party">
                    <div class="column is-4-tablet is-12-mobile" v-for="pokemon in pokemonList">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image pokemon-sprite container">
                                    <img @dblclick.stop="removePokemonFromParty(pokemon)" v-if="pokemon.sprites" :src="pokemon.sprites.front_default" :class="{ 'is-dead': pokemon.isDead }" class="pokemon-sprite" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div class="card-content px-1 py-2">
                                <div class="media">
                                    <div class="media-content">
                                        <p class="title is-4 mb-1">
                                            {{ pokemon.nickname }}
                                        </p>
                                        <p class="tag is-info is-light">lvl {{ pokemon.level }}</p>
                                        <p @dblclick.stop="setPokemonName(pokemon)" class="subtitle is-6 mb-0">
                                            {{ pokemon.name }} <br />
                                        <blockquote v-if="pokemon.isDead">
                                            <i>"{{ pokemon.obituary }}"</i>
                                        </blockquote>
                                        </p>
                                        <div class="subtitle is-6">
                                            <div>
                                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="682.667" height="682.667" viewBox="0 0 512 512">
                                                    <path d="M233 1.2c-35.5 3.3-75.3 17.5-104.5 37.1-18.6 12.5-38.6 30.7-52 47.1-27.7 34.2-45 75.1-50.7 120-.9 7.3-1.3 27.8-1.3 75.1 0 61.7.1 65.2 1.9 68.8 1.5 3.1 11.8 11.3 53.2 42.8l51.3 38.9.3 33.8c.3 37.9.2 37.2 8.1 43.6l3.9 3.1h13.7c12.8 0 14-.2 17.2-2.4 1.9-1.3 4.6-4 5.9-6 2.3-3.4 2.5-4.6 3-21.1.3-10.9 1-18.3 1.7-19.6 4.1-7.2 15.5-7.2 19.5-.1.9 1.4 1.5 8.2 1.8 19.2.6 19.1 1.2 21.1 8.3 26.9 3.5 2.8 4.6 3.1 10.7 3.1s7.2-.3 10.7-3.1c7.2-5.8 7.7-7.7 8.3-27.7l.5-17.9 3.3-2.9c2.6-2.4 4.1-2.9 8.2-2.9s5.6.5 8.2 2.9l3.3 2.9.5 17.9c.6 20 1.1 21.9 8.3 27.7 3.5 2.8 4.6 3.1 10.7 3.1s7.2-.3 10.7-3.1c7.2-5.8 7.7-7.7 8.3-27.7l.5-17.9 3.3-2.9c5.3-4.8 14.1-3.5 17.5 2.5.7 1.3 1.4 8.8 1.7 19.7.5 16.5.6 17.8 2.9 21.1 1.3 1.9 4 4.6 5.9 5.9 3.3 2.2 4.4 2.4 17.3 2.4h13.7l3.9-3.1c7.9-6.4 7.7-5.8 8.3-43.8l.5-34 50.5-38.2c40.8-31 51-39.1 53-42.6l2.5-4.3V279c0-59-.2-67.8-1.8-78-5.4-34.1-15.6-62.9-32.1-90-16.6-27.2-42.3-54-68.8-71.8C340.6 9.6 286.7-3.9 233 1.2zm-60.5 215.3c17.9 3.7 35 17 43.3 33.5 7 13.9 8.7 26.8 5.6 41.7-4.7 23-20.1 40.1-42.9 47.9-10 3.4-25.2 3.8-35.4 1-22.2-6.1-39.7-23.5-45.7-45.6-2.8-10.3-2.4-25.5 1-35.5 10.8-31.7 41.9-49.7 74.1-43zm193.2.1c23.9 4.9 42.5 22.6 48.9 46.5 2.2 8.4 2.2 23.3-.1 31.9-5.7 21.8-23.5 39.6-45.5 45.6-10.3 2.8-25.5 2.4-35.5-1-25.8-8.8-42.7-30.6-44.2-57-1-18.7 5.4-35.4 18.6-48.7 15.7-15.6 36.3-21.8 57.8-17.3zM262.9 337.7c4 3.7 22.1 37 22.1 40.6 0 1.5-.7 4.2-1.6 5.8-2.6 5.2-6.1 5.9-27.6 5.9-21.1 0-24.9-.8-27.5-6-2.5-5-1.5-8.1 8.2-26 10.8-19.8 13.6-23 19.5-23 2.9 0 4.7.7 6.9 2.7z"></path>
                                                </svg>
                                                {{pokemon.reviveCount > 0 ? pokemon.reviveCount : '0'}}
                                            </div>
                                            <div> 
                                                <svg @dblclick.stop="listRoutes(pokemon)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                                </svg>
                                                {{pokemon.metOn}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <footer class="card-footer">
                                <button v-if="pokemon.isDead" @click="markAsRevived(pokemon)" class="card-footer-item button is-info is-small">
                                    Revive
                                </button>

                                <button v-else @click="markAsDead(pokemon)" class="card-footer-item button is-info is-danger is-small">
                                    Set as dead
                                </button>

                                <button v-if="!pokemon.isDead" class="button is-info card-footer-item is-small" @click="setLevel(pokemon)">
                                    Set level
                                </button>
                                <!-- <a href="#" class="card-footer-item">Edit</a>  -->
                            </footer>
                        </div>
                    </div>
                </div>
            </div>

            <div class="control-section">
                <button class="button is-info is-light mr-1 add-btn" v-on:click="openAddModal">
                    <span class="icon is-small">
                        <span>+</span>
                    </span>
                </button>

                <button class="button is-info is-light mr-1 add-btn" v-on:click="toggleView('dead')">
                    <span class="icon is-small">
                        <svg v-if="!showDead" version="1.0" xmlns="http://www.w3.org/2000/svg" width="682.667" height="682.667" viewBox="0 0 512 512">
                            <path d="M233 1.2c-35.5 3.3-75.3 17.5-104.5 37.1-18.6 12.5-38.6 30.7-52 47.1-27.7 34.2-45 75.1-50.7 120-.9 7.3-1.3 27.8-1.3 75.1 0 61.7.1 65.2 1.9 68.8 1.5 3.1 11.8 11.3 53.2 42.8l51.3 38.9.3 33.8c.3 37.9.2 37.2 8.1 43.6l3.9 3.1h13.7c12.8 0 14-.2 17.2-2.4 1.9-1.3 4.6-4 5.9-6 2.3-3.4 2.5-4.6 3-21.1.3-10.9 1-18.3 1.7-19.6 4.1-7.2 15.5-7.2 19.5-.1.9 1.4 1.5 8.2 1.8 19.2.6 19.1 1.2 21.1 8.3 26.9 3.5 2.8 4.6 3.1 10.7 3.1s7.2-.3 10.7-3.1c7.2-5.8 7.7-7.7 8.3-27.7l.5-17.9 3.3-2.9c2.6-2.4 4.1-2.9 8.2-2.9s5.6.5 8.2 2.9l3.3 2.9.5 17.9c.6 20 1.1 21.9 8.3 27.7 3.5 2.8 4.6 3.1 10.7 3.1s7.2-.3 10.7-3.1c7.2-5.8 7.7-7.7 8.3-27.7l.5-17.9 3.3-2.9c5.3-4.8 14.1-3.5 17.5 2.5.7 1.3 1.4 8.8 1.7 19.7.5 16.5.6 17.8 2.9 21.1 1.3 1.9 4 4.6 5.9 5.9 3.3 2.2 4.4 2.4 17.3 2.4h13.7l3.9-3.1c7.9-6.4 7.7-5.8 8.3-43.8l.5-34 50.5-38.2c40.8-31 51-39.1 53-42.6l2.5-4.3V279c0-59-.2-67.8-1.8-78-5.4-34.1-15.6-62.9-32.1-90-16.6-27.2-42.3-54-68.8-71.8C340.6 9.6 286.7-3.9 233 1.2zm-60.5 215.3c17.9 3.7 35 17 43.3 33.5 7 13.9 8.7 26.8 5.6 41.7-4.7 23-20.1 40.1-42.9 47.9-10 3.4-25.2 3.8-35.4 1-22.2-6.1-39.7-23.5-45.7-45.6-2.8-10.3-2.4-25.5 1-35.5 10.8-31.7 41.9-49.7 74.1-43zm193.2.1c23.9 4.9 42.5 22.6 48.9 46.5 2.2 8.4 2.2 23.3-.1 31.9-5.7 21.8-23.5 39.6-45.5 45.6-10.3 2.8-25.5 2.4-35.5-1-25.8-8.8-42.7-30.6-44.2-57-1-18.7 5.4-35.4 18.6-48.7 15.7-15.6 36.3-21.8 57.8-17.3zM262.9 337.7c4 3.7 22.1 37 22.1 40.6 0 1.5-.7 4.2-1.6 5.8-2.6 5.2-6.1 5.9-27.6 5.9-21.1 0-24.9-.8-27.5-6-2.5-5-1.5-8.1 8.2-26 10.8-19.8 13.6-23 19.5-23 2.9 0 4.7.7 6.9 2.7z" />
                        </svg>
                        <svg v-else version="1.0" xmlns="http://www.w3.org/2000/svg" width="458.667" height="458.667" viewBox="0 0 344 344">
                            <path d="M154.5 29.6c-43.7 6.6-80.4 29.8-103.2 65.3C42.2 109.1 32 135 32 144c0 5 3.3 9.8 8.3 12 3.9 1.8 6.9 2 44.1 2 46.7 0 44.9.3 52.6-10.2 5.3-7.3 12.4-13 20-16 7.9-3.1 22.2-3.1 30.3.1 7.4 2.9 15.1 9.1 20 16.2 2.2 3.2 5.4 6.3 7.9 7.6 4.1 2.3 4.5 2.3 44.2 2.3 37.2 0 40.4-.2 44.3-1.9 8.3-3.8 9.8-10.2 5.9-24.2-2.9-10.1-11-27.9-16.9-37-20.4-31.8-54.3-55.2-91.7-63.4-7.3-1.6-39.7-2.9-46.5-1.9z" />
                            <path d="M164.6 159.9c-4.3 2.9-6.6 7-6.6 12.1 0 2.7.8 5.6 1.9 7.4 2.9 4.3 7 6.6 12.1 6.6 14.2 0 19.3-18.2 7.4-26.1-3.8-2.5-11-2.5-14.8 0zM40.3 188c-5 2.2-8.3 7-8.3 12 0 5.9 4.8 20.8 10.5 32.7 7.5 15.7 16.2 28 28.5 40.3 20.3 20.3 44.4 33.4 73 39.6 12 2.6 43.9 2.7 55.8.1 28.5-6.1 53.1-19.5 73.2-39.7 12.3-12.3 21.1-24.7 28.5-40.3 5.7-11.9 10.5-26.8 10.5-32.7 0-5-3.3-9.8-8.3-12-3.9-1.8-6.9-2-44.1-2-38.3 0-40.1.1-44.2 2.1-2.9 1.3-5.3 3.6-7.4 7-9.2 14.2-26.4 22-42.6 19.2-12.1-2.1-22.9-9.2-29.4-19.2-2.1-3.4-4.5-5.7-7.4-7-4.1-2-5.9-2.1-44.2-2.1-37.2 0-40.2.2-44.1 2z" />
                        </svg>
                    </span>
                </button>

                <button class="button is-info is-light add-btn mr-1" v-on:click="toggleView('runs')">
                    <span class="icon is-small">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="920" height="790.667" viewBox="0 0 690 593">
                            <path d="M157.7 106.5c-8.5 3.1-17.5 11.7-26.6 25.3-5.6 8.3-16.1 30-20.6 42.7-5.3 14.6-8.2 19.5-21.6 35.5-15.3 18.4-22.9 29.8-27 40.8-3.2 8.3-3.3 9.4-3.4 22.7v14l3.6 7.6c6.7 13.9 23.1 28.5 44.1 39 20.4 10.2 45.5 19 96.3 33.8C248 381 242.7 378.8 304 411c70 36.9 124.8 60.4 163.9 70.3 12.6 3.2 12.7 3.2 38.1 3.2 28.1-.1 39.2-1.3 59.5-6.5 31.2-8 51.5-23.1 59.7-44.1 2.9-7.6 3.6-22.6 1.4-30.1-2.1-7.2-10.1-19.3-16.9-25.4-15.7-14.2-33.3-21.6-56.1-23.5-14.5-1.2-20.2-3.1-31.4-10.6-16.7-11-38.3-35-68.1-75.3-17.7-24.1-23.5-35.8-44.1-90.2-15.9-42-22.7-55.1-31.9-61-4.3-2.8-5.1-2.9-12.7-2.6-7 .4-9.3 1-16.5 4.5-10.8 5.1-25 15.9-41.9 31.7L293.6 164h-8.1c-9.2 0-24.5-2.2-32.5-4.6-11.3-3.4-15.3-6.1-36.8-25.5-17.8-16-24.5-21.1-33.7-25.5-5.9-2.9-8-3.4-14-3.3-3.8 0-8.7.7-10.8 1.4zm16.6 21.1c4.9 2.5 14.9 10.6 29.6 23.8 7.3 6.7 15.9 14 19 16.4 15.2 11.5 37.4 17.2 67.5 17.2h12.9l14.6-14.3c16.6-16.2 29-26.2 38.7-31.3 9.6-5 10.9-4.6 16.1 5.1 4.2 7.9 14.3 32 14.3 34.1 0 .6-5.7 4.9-12.7 9.5-15.7 10.4-16.3 11-16.3 17 0 6.4 3.4 9.9 9.6 9.9 3.8 0 6-1 15.9-7.7 6.3-4.2 11.7-7.4 11.8-7.2.2.2 2.7 6.5 5.6 13.9 2.9 7.4 5.5 14 5.7 14.6.3.6-5.2 4.9-12.2 9.5-15.8 10.4-16.4 11-16.4 17 0 6.4 3.4 9.9 9.7 9.9 3.8 0 5.9-1 16.3-8l11.9-7.9 4.7 8.2c2.5 4.5 6.4 10.5 8.5 13.3l3.8 5.2-15.6 10.3c-8.6 5.7-16.5 11.3-17.5 12.3-1.2 1.3-1.8 3.5-1.8 6.7 0 6.4 3.4 9.9 9.7 9.9 3.9 0 6.1-1.2 21-11.1l16.6-11.2 2.1 2.9c5.5 7.7 22.6 28.6 30.4 37.1 16.7 18.6 35.2 32.8 50.1 38.6 5.8 2.3 10.8 3.3 21.1 4.3 14.8 1.4 21.4 3.1 30.5 7.7 16.8 8.4 27.5 21.3 27.5 33.1 0 5.7-.7 8.6-2 8.6-.5 0-4.5 2.2-8.9 4.9-15.5 9.4-30.3 13.7-50.6 14.7-34.8 1.8-78.6-11-133-38.6-34.1-17.3-62.5-34.6-120.4-73-40.4-26.8-53.2-34.8-63-39.2-3.6-1.6-21.9-8.1-40.6-14.3-46.2-15.3-62.7-22.6-77.6-34.2C105.3 241 99 234 99 232.2c0-.5 3.7-5.4 8.2-10.8 12.1-14.7 16.8-22.5 22.2-37 8.4-22.5 15-35.3 24.9-48.2 7.3-9.5 13.2-12.1 20-8.6zm-68.8 140c17.6 11.4 34.5 18.5 78.6 32.8 41.2 13.4 38.4 11.9 97.4 51.1 61 40.4 84.1 54.4 121 73 40.2 20.3 69.1 31.1 101 37.5l9 1.8-7 .2c-12.5.3-17.8-.1-27-2-37.3-7.7-92.8-31.9-188-82-16.5-8.7-34.3-17.4-39.5-19.3-5.2-2-23.7-7.7-41-12.7-38.2-11.1-55.6-16.7-71.8-23.1-31.6-12.6-50.7-25.8-57.1-39.4-3.6-7.8-2.9-19 2-30.5l1.9-4.5 6.3 5.9c3.4 3.3 9.8 8.3 14.2 11.2z" />
                        </svg>
                    </span>
                </button>

                <button class="button is-info is-light add-btn" v-on:click="listRoutes()">
                    <span class="icon is-small">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>
                        </svg>
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
                                <h1>Add Pokemon</h1>
                                <div class="field">
                                    <label class="label">Pokemon</label>
                                    <div class="control has-text-centered">
                                        <Dropdown autocomplete="off" :options="pokemon" :disabled="false" v-on:selected="validatePokemon" placeholder="Please select an option">
                                        </Dropdown>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Nickname</label>
                                    <div class="control">
                                        <input class="input is-success" type="text" maxlength="12" placeholder="Nickname" v-model="pokemonNickname" />
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Level</label>
                                    <div class="control">
                                        <input class="input is-success" type="number" max="100" placeholder="Level" v-model="pokemonLevel" />
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Met on</label>
                                    <div class="control">
                                        <input class="input is-success" type="text" placeholder="Met on" v-model="pokemonMetOn" />
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" type="submit">Add</button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" v-on:click="cancelAddPokemonToParty">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="addModal = false" class="modal-close is-large" aria-label="close"></button>
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
                                        <input class="input is-success" type="text" placeholder="Obituary" v-model="deadComment" />
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" type="submit">
                                            Confirm
                                        </button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" v-on:click="markAsDeadClose">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="markAsDeadClose" class="modal-close is-large" aria-label="close"></button>
        </div>

        <div class="modal" :class="{ 'is-active': levelModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <form @submit="setLevelConfirm">
                                <div class="field">
                                    <label class="label">Set level </label>
                                    <div class="control">
                                        <input class="input is-success" type="number" max="100" placeholder="Level" v-model="selectedPokemonLevel" />
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" type="submit">
                                            Confirm
                                        </button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" v-on:click="setLevelClose">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="setLevelClose" class="modal-close is-large" aria-label="close"></button>
        </div>



        <div class="modal" :class="{ 'is-active': setPokemonNameModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <form @submit="setPokemonNameConfirm">
                                <div class="field">
                                    <label class="label">Set pokemon</label>
                                    <div class="control"> 
                                        <Dropdown autocomplete="off" :options="pokemon" :disabled="false" v-on:selected="setNewPokemon" placeholder="Please select an option">
                                        </Dropdown>
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" type="submit">
                                            Confirm
                                        </button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" v-on:click="setPokemonNameModal = false">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="setPokemonNameModal = false" class="modal-close is-large" aria-label="close"></button>
        </div>

        <div class="modal" :class="{ 'is-active': showRuns }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <div class="content">

                            <table class="runs-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Distance</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="run in sortedRuns">
                                        <td>{{run.name}}</td>
                                        <td>{{Number(run.distance / 1000).toFixed(2)}} KM ({{Number(run.distance / 100).toFixed(2)}} HM)</td>
                                        <td>{{formatDate(run.start_date)}}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="control">
                                <button class="button is-link" v-on:click="showRuns = false" type="submit">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="showRuns = false" class="modal-close is-large" aria-label="close"></button>
        </div>

        <div class="modal" :class="{ 'is-active': routesModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <div class="content">

                            <table class="runs-table">
                                <thead>
                                    <tr>
                                        <th>Pokemon</th>
                                        <th>Route</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="route in routesMetOn">
                                        <td>{{route.pokemon && route.pokemon.data ? route.pokemon.data.name : route.pokemon.name}}</td>
                                        <td>{{route.routeName}}</td>
                                        <td>{{route.comment}}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link" v-on:click="addNewRoute()">
                                        Add
                                    </button>
                                </div>
                                <div class="control">
                                    <button class="button is-link is-light" v-on:click="routesModal = false">
                                        close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="routesModal = false" class="modal-close is-large" aria-label="close"></button>
        </div>

        <div class="modal" :class="{ 'is-active': addRouteModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <form @submit="addRouteConfirm">
                                <div class="field">
                                    <label class="label">Add encounter </label> 
                                    <Dropdown v-if="!routeMetOnPartyPokemon" type="search"  :options="pokemon" :disabled="false" v-on:selected="setRoutePokemon" placeholder="Please select an option">
                                    </Dropdown> 
                                    <p v-if="routeMetOnPartyPokemon">Adding encounter for <strong>{{routeMetOnPartyPokemon.nickname}}   </strong></p>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <input class="input is-success" type="text" placeholder="Route..." v-model="routeMetOnName" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="control">
                                        <input class="input is-success" type="text" placeholder="Comment" v-model="routeMetOnComment" />
                                    </div>
                                </div>

                                <div class="field is-grouped">
                                    <div class="control">
                                        <button class="button is-link" type="submit">
                                            Confirm
                                        </button>
                                    </div>
                                    <div class="control">
                                        <button class="button is-link is-light" v-on:click="setRouteClose">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button v-on:click="setLevelClose" class="modal-close is-large" aria-label="close"></button>
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
            showRuns: false,
            selectedPokemon: null,
            pokemonNickname: null,
            pokemonLevel: null,
            pokemonMetOn: null,
            addModal: false,
            showDead: false,
            deadPokemon: null,
            deadComment: "",
            deadModal: null,
            levelModal: null,
            runModal: null,
            routesModal: null,
            addRouteModal: null,
            runAmount: 0,
            selectedPokemonLevel: null,
            routeMetOnPokemon: null,
            routeMetOnPartyPokemon: null,
            routeMetOnName: null,
            routeMetOnComment: null,
            editingPokemon: null,
            setPokemonNameModal: null,
            selectedPokemonNameChange: null,
            newPokemonName: null,
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
        setPokemonName(pokemon) {
            this.selectedPokemonNameChange = pokemon
            this.setPokemonNameModal = true
        }, 
        setPokemonNameConfirm(e) {
            e.preventDefault();
axios.get("https://pokeapi.co/api/v2/pokemon/" + this.newPokemonName.name.toLowerCase()).then(
                function (response) {
            this.$store.commit("setPokemonName", {
                newPokemon: response.data,
                pokemon: this.selectedPokemonNameChange,
                newName: this.newPokemonName,
            });
            this.setPokemonNameModalClose();
                }.bind(this));

          
        },
        setPokemonNameModalClose(){
            this.setPokemonNameModal= null;
            this.selectedPokemonNameChange= null;
            this.newPokemonName=null;
        },
        formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [day, month, year].join("/");
        },
        toggleView(view) {
            if (view == "runs") {
                this.showRuns = true;
                this.showDead = false;
            } else {
                this.showRuns = false;
                this.showDead = !this.showDead;
            }
        },
        addNewRoute() {
            this.routesModal = false;
            this.addRouteModal = true;
        },
        setRunAmount() {
            this.runModal = true;
            this.runAmount = false;
        },
        listRoutes(pokemon) {
            if(pokemon){
                this.routeMetOnPartyPokemon = pokemon
            }else{
                this.routeMetOnPartyPokemon = ''
            }
            this.routesModal = true;
        },
        openAddModal() {
            this.addModal = true;
            this.showDead = false;
        },

        setRoute() {
            this.addRouteModal = true;
        },
        setRouteClose(e) {
            e.preventDefault();
            this.addRouteModal = false;
            this.routeMetOnName = "";
            this.routeMetOnComment = "";
            this.routeMetOnPokemon = "";
            this.routeMetOnPartyPokemon = "";
        },
        addRouteConfirm(e) {
            e.preventDefault();
            if(this.routeMetOnPartyPokemon){
this.$store.commit("setPartyPokemonRoute", {
                    pokemon: this.routeMetOnPartyPokemon,
                    routeName: this.routeMetOnName,
                    comment: this.routeMetOnComment,
                });
            }else{
                this.$store.commit("addRouteEncounter", {
                    pokemon: this.routeMetOnPokemon,
                    routeName: this.routeMetOnName,
                    comment: this.routeMetOnComment,
                });
            }
            this.setRouteClose(e);
        },
        setLevel(pokemon) {
            this.editingPokemon = pokemon;
            this.selectedPokemonLevel = pokemon.level;
            this.levelModal = true;
        },
        setLevelClose(e) {
            e.preventDefault();
            this.editingPokemon = null;
            this.selectedPokemonLevel = null;
            this.levelModal = false;
        },
        setLevelConfirm(e) {
            e.preventDefault();
            this.$store.commit("setPokemonLevel", {
                pokemon: this.editingPokemon,
                level: this.selectedPokemonLevel,
            });
            this.setLevelClose();
        },
        markAsDead(pokemon) {
            this.deadModal = true;
            this.deadPokemon = pokemon;
        },
        markAsDeadClose() {
            this.deadModal = false;
            this.deadPokemon = null;
            this.deadComment = "";
        },
        markAsDeadConfirm(e) {
            e.preventDefault();
            this.$store.commit("markAsDead", {
                pokemon: this.deadPokemon,
                comment: this.deadComment,
            });
            this.markAsDeadClose();
        },
        markAsRevived(pokemon) {
            this.$store.commit("markAsRevived", pokemon);
        },
        removePokemonFromParty(pokemon) {
            if (confirm("Remove pokemon from party?")) {
                this.$store.commit("removePokemonFromParty", pokemon);
            }
        },
        cancelAddPokemonToParty(e) {
            e.preventDefault();
            this.addModal = false;
        },
        addPokemonToParty(e) {
            e.preventDefault();
            axios.get("https://pokeapi.co/api/v2/pokemon/" + this.selectedPokemon.name.toLowerCase()).then(
                function (response) {
                    this.$store.commit("addPokemonToParty", {
                        data: response.data,
                        nickname: this.pokemonNickname,
                        level: this.pokemonLevel,
                        metOn: this.pokemonMetOn,
                    });
                    this.selectedPokemon = null;
                    this.pokemonNickname = null;
                    this.pokemonLevel = null;
                    this.pokemonMetOn = null;
                    this.addModal = false;
                }.bind(this)
            );
        },
        validatePokemon(selection) {
            this.selectedPokemon = selection;
        },
        setNewPokemon(selection) {
            this.newPokemonName = selection;
        }, 
        setRoutePokemon(selection) {
            this.routeMetOnPokemon = selection;
        },
        setRoutePartyPokemon(selection) {
            this.routeMetOnPartyPokemon = selection;
        },
        async authUser() {
            const authURL = await strava.oauth.getRequestAccessURL({
                scope: "activity:read",
            });
            window.location.href = authURL;
        },
        async getRuns() {
            var d = new Date();
            d.setHours(d.getHours() - 12);

            const runs = await strava.athlete.listActivities(
                {
                    access_token: this.user.access_token,
                },
                function (err, payload, limits) {
                    if (!err) {
                        console.log(payload);
                    } else {
                        // refresh tokens are for suckers
                        this.$store.commit("setUser", null);
                    }
                }.bind(this)
            );
            this.$store.commit("setRuns", runs);
            console.log(runs);
        },
    },
    computed: {
        sortedRuns: function () {
            var myRuns = [];
            for (var run in this.runs) {
                if (new Date(this.runs[run].start_date) > new Date("2021-01-01T17:30:11Z")) {
                    myRuns.push(this.runs[run]);
                }
            }

            return myRuns.sort((a, b) => b.start_date - a.start_date);
        },
        urlCode: function () {
            var url_string = window.location; //window.location.href
            var url = new URL(url_string);
            return url.searchParams.get("code");
        },
        pokemonList: function () {
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
            "routesMetOn",
        ]),
    },
};
</script>
