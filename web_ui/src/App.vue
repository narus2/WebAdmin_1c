<template>
  <div id="app">
    <ListClusters></ListClusters>
  </div>
</template>

<script>
import ListClusters from "./components/ListClusters";

export default {
  name: 'app',
  components: {
    ListClusters,
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

