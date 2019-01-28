<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <spin size="large" tip="数据加载中" v-if="isloading"></spin>
    </div>
</template>
<script>
import { Spin } from 'ant-design-vue'
export default {
    data: function() {
        return {
            isloading: false
        };
    },
    components: { Spin },
    computed: {
        listenDataLoading() {
            return this.$store.state.loadingdata;
        }
    },
    watch: {
        listenDataLoading: function(new_value, old_value) {
            this.isloading = new_value;
        }
    }
}
</script>
<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>