<template>
    <select v-model="selectedLanguage">
        <option v-for="lang in languages" :value="lang">{{lang.long}}</option>
    </select>
    {{selectedLanguage}}


    <!--<select class="LanguageSwitcher"-->
            <!--name="language"-->
            <!--@change="changeLanguage">-->
        <!--<option v-for="lang in supportedLanguages"-->
                <!--:key="lang"-->
                <!--:selected="isCurrentLanguage(lang)"-->
                <!--:class="{ 'is-selected': isCurrentLanguage(lang) }"-->
                <!--:value="lang">-->
            <!--{{lang}}-->
        <!--</option>-->
    <!--</select>-->
</template>

<script>
    import {mapState} from 'vuex';
    import Vue from 'vue';
    export default {
        name: "TheLanguageSwitcher",
        computed: mapState(['languages']),
        created() {
            // console.log('created', this.$store.state.curLanguage);
            Vue.i18n.set(this.$store.state.curLanguage.short);
        },
        data() {
            return {
                selectedLanguage: this.$store.state.curLanguage,
            }
        },
        watch: {
            'selectedLanguage': function(newLang) {
                // console.log('new lang selected', newLang);
                Vue.i18n.set(newLang.short);
                this.$store.commit('setLanguage', newLang.short);
            }
        }
        }
</script>

<style scoped>

</style>