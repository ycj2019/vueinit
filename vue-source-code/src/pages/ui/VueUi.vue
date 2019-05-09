<template>
    <div>
        <!--<drop-down></drop-down>-->
      <router-view></router-view>
    </div>
</template>

<script>
    import DropDown from "./DropDown";
    export default {
        name: "VueUi",
        components: {DropDown}
    }
</script>

<style scoped>

</style>
