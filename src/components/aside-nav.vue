<template lang="pug">
    .aside-nav-wrapper
        el-menu(:default-active="defaultActive.index" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse")
            el-menu-item(:index="item.index" v-for="item of navList" :key="item.index")
                i.el-icon-menu
                span(slot="title") {{ item.title }}
</template>
<script>
    export default {
        props: {
            defaultActive: {
                type: Object,
                default: {}
            },
            navList: Array,
        },
        data() {
            return {
                isCollapse: false,
            }
        },
        created() {
        },
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {
                
            },
            handleSelect(key, keyPath) {
                this.$emit('nav:change', key, keyPath);
            }
        }
    }
</script>
<style lang="scss">
    .aside-nav-wrapper {

    }
</style>