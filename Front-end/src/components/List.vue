<template>
    <div class="list">
      <div class="input-block">
        <el-input v-model="value" suffix-icon="el-icon-search" v-on:keyup.enter.native="submit"></el-input>
      </div>
      <hr style="border: 1px solid #F2F6FC;"/>
      <div class="content">
        <div v-if="isEmpty">
          无搜索结果
        </div>
        <div v-else>
          <el-card class="card" shadow="hover" v-for="item in matchList" :key="item.pid">
            {{item.name}}
          </el-card>
        </div>

      </div>
    </div>
</template>

<script>
export default {
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
    matchList() {
      const list = this.dataList.filter(item => {
        return item.name.search(this.value) > -1;
      });
      return list || [];
    },
    isEmpty() {
      return !this.matchList.length;
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.value = to.query.search;
      },
      immediate: true
    }
  },
  methods: {
    submit() {
      this.$router.push({ path: `/list?search=${this.value}` });
    }
  }
};
</script>

<style lang="scss">
.list {
  .input-block {
    width: 36%;
    padding: 50px;
  }
  .content {
    padding: 20px 50px;
    .card {
      margin-bottom: 10px;
      text-align: left;
    }
  }
}
</style>
