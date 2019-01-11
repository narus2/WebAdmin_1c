<template>
    <div>
    <md-table v-model="sessions" md-card @md-selected="onSelect">
            <md-table-toolbar> <h1 class="md-title">{{$t("aUsers")}}</h1> </md-table-toolbar>

            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
               <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

               <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" click="delete_session">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>

        <md-table-row v-if="base != null" slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
            <md-table-cell md-label="sid" md-sort-by="sid" >{{ item.sid }}</md-table-cell>
            <md-table-cell md-label="appId" md-sort-by="appId" >{{ item.appId }}</md-table-cell>
            <md-table-cell md-label="blockedByDbms" md-sort-by="blockedByDbms" >{{ item.blockedByDbms }}</md-table-cell>
            <md-table-cell md-label="blockedByLs" md-sort-by="blockedByLs" >{{ item.blockedByLs }}</md-table-cell>
            <md-table-cell md-label="bytesAll" md-sort-by="bytesAll" >{{item.bytesAll}}</md-table-cell>
            <md-table-cell md-label="bytesLast5Min" md-sort-by="bytesLast5Min" >{{item.bytesLast5Min}}</md-table-cell>

            <md-table-cell md-label="callsAll" md-sort-by="callsAll" >{{item.callsAll}}</md-table-cell>
            <md-table-cell md-label="callsLast5Min" md-sort-by="callsLast5Min" >{{item.callsLast5Min}}</md-table-cell>
            <md-table-cell md-label="connectionId" md-sort-by="connectionId" >{{item.connectionId}}</md-table-cell>
            <md-table-cell md-label="dbmsBytesAll" md-sort-by="dbmsBytesAll" >{{item.dbmsBytesAll}}</md-table-cell>
            <md-table-cell md-label="dbmsBytesLast5Min" md-sort-by="dbmsBytesLast5Min" >{{item.dbmsBytesLast5Min}}</md-table-cell>
            <md-table-cell md-label="dbProcInfo" md-sort-by="dbProcInfo" >{{item.dbProcInfo}}</md-table-cell>
            <md-table-cell md-label="dbProcTook" md-sort-by="dbProcTook" >{{item.dbProcTook}}</md-table-cell>
            <md-table-cell md-label="dbProcTookAt" md-sort-by="dbProcTookAt" >{{item.dbProcTookAt}}</md-table-cell>
            <md-table-cell md-label="durationAll" md-sort-by="durationAll" >{{item.durationAll}}</md-table-cell>
            <md-table-cell md-label="durationAllDbms" md-sort-by="durationAllDbms" >{{item.durationAllDbms}}</md-table-cell>

            <md-table-cell md-label="durationCurrent" md-sort-by="durationCurrent" >{{item.durationCurrent}}</md-table-cell>
            <md-table-cell md-label="durationCurrentDbms" md-sort-by="durationCurrentDbms" >{{item.durationCurrentDbms}}</md-table-cell>
            <md-table-cell md-label="durationLast5Min" md-sort-by="durationLast5Min" >{{item.durationLast5Min}}</md-table-cell>
            <md-table-cell md-label="durationLast5MinDbms" md-sort-by="durationLast5MinDbms" >{{item.durationLast5MinDbms}}</md-table-cell>
            <md-table-cell md-label="host" md-sort-by="host" >{{item.host}}</md-table-cell>
            <md-table-cell md-label="infoBaseId" md-sort-by="infoBaseId" >{{item.infoBaseId}}</md-table-cell>
            <md-table-cell md-label="lastActiveAt" md-sort-by="lastActiveAt" >{{item.lastActiveAt}}</md-table-cell>
            <md-table-cell md-label="licenses" md-sort-by="licenses" >{{item.licenses}}</md-table-cell>
            <md-table-cell md-label="locale" md-sort-by="locale" >{{item.locale}}</md-table-cell>
            <md-table-cell md-label="workingProcessId" md-sort-by="workingProcessId" >{{item.workingProcessId}}</md-table-cell>
        </md-table-row>
    </md-table>
        <p>Selected:</p>
        {{ selected }}
        </div>
</template>

<script>
    import  { bus } from '../main';

    import { apiService } from '../main';

    export default {
        name: "UserConnectBase",
        props: {cluster: {type: String, required: true}, base:{type: String, required: true} },
        data() {
            return {
                sessions: [],
                selected: [],
            };
        },
        computed:{
           //on_load: on_load

        },
        methods: {
            on_load(cluster, base){
                console.info("Get session")
                bus.$emit("on_load_server", true)
                apiService.getSession(cluster, base).then((data) => {
                    this.sessions = data;
                    bus.$emit("on_load_server", false)
                });
            },
            delete_session(){
                console.info("delete session")
                bus.$emit("on_deleteSession", true)
                apiService.deleteSession(this.cluster, this.base, this.selected);
                bus.$emit("on_deleteSession", false)
                //this.on_load(this.cluster, this.base)
            },

            onSelect (items) {
                let sid = [];
                items.map(value => sid.push(value.sid));
                this.selected = sid;
            },
            getAlternateLabel (count) {
                return "$t(delete_sessions)" + count;
            }
        },
        mounted() {
            bus.$on("Update_UserConnectBase", data => {
                this.on_load(data.cluster, data.base);
            })
            this.on_load(this.cluster, this.base);
        }
    }

</script>

<style scoped>

</style>