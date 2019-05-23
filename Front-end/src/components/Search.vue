<template>
    <div class="search">
      <div class="input-block">
        <el-autocomplete
          popper-class="input-block"
          v-model="value"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          @select="handleSelect"
          @keyup.enter.native="submit">
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </div>
    </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      value: ""
    };
  },
  created() {
    this.$store.dispatch("getListAC");
  },
  computed: {
    dataList() {
      return this.$store.state.dataList || [];
    },
  },
  methods: {
    submit() {
      this.$router.push({ path: `/list?search=${this.value}` });
    },
      querySearch(queryString, cb) {
        var restaurants = this.dataList;
        console.log(restaurants);
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.search(queryString) > -1);
        };
      },
      handleSelect(item) {
        this.value = item.name;
        this.submit();
      },
  }
};
</script>

<style lang="scss">
.search {
  height: 100%;
  position: relative;
  opacity: 1;
  background-image: url("../assets/bg.jpg");
  .input-block {
    min-width: 360px;
    width: 36%;
    margin: 0 auto;
    position: relative;
    top: 36%;
    >div {
      width: 100%;
    }
  }
}
</style>
