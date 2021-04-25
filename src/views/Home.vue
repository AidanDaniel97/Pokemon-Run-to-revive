  
<template>
    <div class="home">
        <template v-if="!user">
            <button @click="authUser()">Login</button>
        </template>

        <template v-else>
            <p>{{this.runs}}</p>
        </template>

    </div>
</template>

<script>
import { default as strava, Strava } from "strava-v3";
import { mapState } from "vuex";

strava.config({
    access_token: process.env.VUE_APP_STRAVA_ACCESS_TOKEN,
    client_id: process.env.VUE_APP_STRAVA_CLIENT_ID,
    client_secret: process.env.VUE_APP_STRAVA_CLIENT_SECRET,
    redirect_uri: process.env.VUE_APP_STRAVA_REDIRECT_URI,
});

export default {
    name: "Home",
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
        mounted() {
            // check if user is auth
        },
        async authUser() {
            const authURL = await strava.oauth.getRequestAccessURL({ scope: "activity:read" });
            window.location.href = authURL;
        },
        async getRuns() {
            console.log("GEttying runs");
            const runs = await strava.athlete.listActivities({ access_token: this.user.access_token });
            this.$store.commit("setRuns", runs);
        },
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
        ]),
    },
};
</script>