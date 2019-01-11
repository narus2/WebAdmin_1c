<template>
    <md-card v-if="cur_base!=null">
        <md-card-header>
            <div class="md-title">{{fullName}}</div>
        </md-card-header>

        <md-card-content>
            <p>infoBaseId: {{cur_base.infoBaseId}}</p>
            <md-steppers>
                <md-step id="first" md-label="Базоввые данные">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label>Имя базы в кластере (Read Only)</label>
                                <md-input v-model="cur_base.name" readonly></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label>Представления базы в кластере (Read Only)</label>
                                <md-input v-model="cur_base.descr" readonly></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-step>

                <md-step id="sql" md-label="SQL">
                    <md-content>
                        <p> Параметры SQL </p>
                        <p>dateOffset: {{cur_base.dateOffset}}</p>
                        <p>dbName: {{cur_base.dbName}}</p>
                        <p>dbPassword: {{cur_base.dbPassword}}</p>
                        <p>dbServerName: {{cur_base.dbServerName}}</p>
                        <p>dbUser: {{cur_base.dbUser}}</p>
                        <p>dbms: {{cur_base.dbms}}</p>
                    </md-content>
                </md-step>
                <md-step id="other" md-label="Other">
                    <md-switch v-model="cur_base.sessionsDenied">Блокировка сеансов</md-switch>
                    <div v-if="cur_base.sessionsDenied">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label>Блокировка с</label>
                                    <md-input v-model="cur_base.deniedFrom" type="datetime-local"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100">
                                <md-field>
                                    <label>Блокировка по</label>
                                    <md-input v-model="cur_base.deniedTo" type="datetime-local"></md-input>
                                </md-field>
                            </div>
                        </div>
                        <md-field>
                            <label>Текст который будет отображаться пользователю</label>
                            <md-textarea v-model="cur_base.deniedMessage"></md-textarea>
                        </md-field>

                        <md-field>
                            <label>Параметр блокировки /UC</label>
                            <md-input v-model="cur_base.deniedParameter"></md-input>
                        </md-field>
                        <p>permissionCode: {{cur_base.permissionCode}}</p>
                    </div>
                    <p>externalSessionManagerConnectionString:
                        {{cur_base.externalSessionManagerConnectionString}}</p>
                    <p>externalSessionManagerRequired: {{cur_base.externalSessionManagerRequired}}</p>
                    <p>licenseDistributionAllowed: {{cur_base.licenseDistributionAllowed}}</p>
                    <p>locale: {{cur_base.locale}}</p>
                    <md-switch v-model="cur_base.scheduledJobsDenied">Блокировка регламетных заданий</md-switch>
                    <p>safeModeSecurityProfileName: {{cur_base.safeModeSecurityProfileName}}</p>
                    <p>securityLevel: {{cur_base.securityLevel}}</p>
                    <p>securityProfileName: {{cur_base.securityProfileName}}</p>
                </md-step>
            </md-steppers>
        </md-card-content>

        <md-card-actions>
            <md-button>Edit</md-button>
            <md-button>Save</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
    import {APIService} from '../plugin/APIService';
    import  { bus } from '../main';

    const apiService = new APIService();

    export default {
        name: "BaseForm",
        props: {cluster: {type: String, required: true}, base:{type: String, required: true} },
        data() {
            return {
                cur_base: null
            };
        },

        computed:{
            fullName: function () {
                return this.cur_base.name
            }
        },
        methods: {
            OnLoad(cluster, base){
                bus.$emit("on_load_server", true);
                apiService.getBaseInfo(cluster, base).then((data) => {
                    this.cur_base = data;
                    this.cur_base.deniedFrom = new Date(this.cur_base.deniedFrom);
                    this.cur_base.deniedTo   = new Date(this.cur_base.deniedTo);
                    bus.$emit("on_load_server", false);
                });
            }
        },
        mounted() {
            this.OnLoad(this.cluster, this.base);
            bus.$on("updateBase", date =>{this.OnLoad(date.cluster, date.base) });
        },
    }
</script>

<style scoped>

</style>