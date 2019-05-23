<template>
  <div class="home">
    <search></search>
  </div>
</template>

<script>
import Search from './Search'
export default {
  name: 'home',
  components: {
    Search
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.home {
  height: 100%;
}
</style>
