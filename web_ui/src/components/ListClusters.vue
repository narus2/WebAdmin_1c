<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <div>
        <md-toolbar class="md-primary">
            <label for="movie">{{$t('locale')}}</label>
            <md-select v-model="locale" id="locale">
                <md-option value="en">en</md-option>
                <md-option value="ru">ru</md-option>
            </md-select>
        </md-toolbar>
        </div>
        <br>

        <div class="page-container">
            <md-app>

                    <md-app-toolbar class="md-primary">
                        <h3 class="md-title" style="flex: 1">{{$t('cluster')}}</h3>
                        <md-field>
                            <md-select v-model="curentcluster" name="cluster" id="cluster" @md-selected="clusterselect">
                                <div :key=contact.clusterId v-for="contact in contacts">
                                    <md-option :value="contact.clusterId">{{contact.name}}</md-option>
                                </div>
                            </md-select>
                        </md-field>
                        <h3 class="md-title" style="flex: 1">{{$t('data_base')}}</h3>
                        <md-field>
                            <md-select v-model="curentbase" name="base" id="base" @md-selected="baseselect">
                                <div :key=base.infoBaseId v-for="base in bases">
                                    <md-option :value="base.infoBaseId">{{base.name}}</md-option>
                                </div>
                            </md-select>
                        </md-field>

                    </md-app-toolbar>
                <md-app-drawer md-permanent="full">
                    <md-toolbar class="md-transparent" md-elevation="0">
                        {{$t('nav')}}
                    </md-toolbar>

                    <md-list class="listdemoListControls">
                        <md-list-item @click="selectComponent='BaseForm'">
                                <md-icon>settings</md-icon>
                            <span class="md-list-item-text">{{$t('base_settings')}}</span>
                        </md-list-item>

                        <md-list-item @click="selectComponent='UserConnectBase'">
                                <md-icon>account_box</md-icon>
                                <span class="md-list-item-text">{{$t('base_users')}}</span>
                        </md-list-item>
                    </md-list>
                </md-app-drawer>

                <md-app-content>
                    <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" v-show="onload"></md-progress-spinner>
                    <component v-if="curentbase!=null" v-show="!onload" :is="selectComponent" :base="curentbase" :cluster = "curentcluster" ></component>
                </md-app-content>
            </md-app>
        </div>
     </div>
</template>

<script>
    import { apiService } from '../main';
    import UserConnectBase from "./UserConnectBase";
    import BaseForm from "./BaseForm";

    import  { bus } from '../main';

    export default {
        name: "ListClusters",
        components: {
            UserConnectBase,
            BaseForm
        },
        data() {
            return {
                selectComponent: "BaseForm",
                contacts: [],
                bases: [],
                curentcluster: null,
                curentbase: null,
                onload: false,
                locale: 'ru'
            };
        },
        computed:{

        },
        methods: {
            getClusters() {
                console.info("event getClusters")
                apiService.getClusters().then((data) => {
                    this.contacts = data;
                    if (this.contacts !=null) {
                        if (this.contacts.length ==1 ){
                            this.curentcluster = this.contacts[0].clusterId
                        }
                    }
                });
            },
            clusterselect() {
                if (this.curentcluster != null) {
                    console.info("event clusterselect")
                    apiService.getBases(this.curentcluster).then((data) => {
                        this.bases = data;
                        if (this.bases.length == 1) {
                            this.curentbase.set(this.bases[0].clusterId);
                        }
                    });
                }

            },
            baseselect(){   //updateBaseForm
                if (this.curentbase != null & this.curentcluster !=null){
                    console.info("befo emit updateBase :" + "cluster:" + this.curentcluster + " base:" + this.curentbase );
                    bus.$emit("Update_"+this.selectComponent, {cluster: this.curentcluster, base: this.curentbase})
                }
            },
            on_load_server(data){
                this.onload=data
            }
        },
        mounted() {
            this.getClusters();
            bus.$on("on_load_server", this.on_load_server);
            console.info(this.$i18n._i("aUsers"))
        },
        watch: {
            locale (val) {
                this.$i18n.locale = val
            }
        }
    }
</script>

<style scoped>
    .wrap {
        padding: 10px;
        height: auto;

    }
</style>