<template>
    <div class="home">
        <Button @click="toggle">加载</Button>
        <div v-if="show">
            <searchLaterOne></searchLaterOne>
            <searchLaterTwo></searchLaterTwo>
        </div>
    </div>
</template>
<script>
import { Button } from 'ant-design-vue'
export default {
    name: 'home',
    components: {
        Button,
        searchLaterOne: function(resolve) {
            //异步组件写法(从服务器端)
            require.ensure(['@/components/laterone.vue'], function(require) {
                setTimeout(function() {
                    require(['@/components/laterone.vue'], resolve)
                }, 3000);
            }, "later");
        },
        searchLaterTwo: function(resolve) {
            //异步组件写法
            require.ensure(['@/components/latertwo.vue'], function(require) {
                require(['@/components/latertwo.vue'], resolve)
            }, "later");
        }
    },
    data() {
        return {
            show: false,
            tokenvalue: ''
        }
    },
    methods: {
        getData() {
            this.$store.commit("showLoading");
            this.http.get("/Api/User/info", {
                    params: {
                        user_id: 290,
                        second_role_id: 7
                    }
                })
                .then(res => {
                    this.$store.commit("hideLoading");
                    console.log(res);
                });
        },
        toggle() {
            this.show = !this.show
        }
    },
    created() {
        this.$store.commit("setToken", localStorage.getItem('token'));
        this.getData()
    },
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
}
</script>