<template>
  <div>
    <keep-alive>
      <router-a></router-a>
    </keep-alive>
    <router-b></router-b>
  </div>
</template>

<script>
    import RouterA from "./RouterA";
    import RouterB from "./RouterB";
    export default {
        name: "RRouter",
        components: {RouterB, RouterA}
    }
</script>

<style scoped>

</style>
