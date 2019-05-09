<template>
    <div class="box" @click="mouse($event)">
        <ul class="boxx" ref="boxx">
          <li class="box1" v-for="(u,idx) in 20" :data="u" :key="idx">{{u}}</li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "DropDown",
        data(){
          return {
            num : 0,
            x:0,
            y:0,
          }
        },
        created(){
          this.init()
        },
        mounted(){
          // this.mouse()
        },
        methods:{
          init(){
            console.log("this is drop")
          },
          mouse(e){
            // document
            document.body.scrollTop = e.clientY
            /*var disx = e.pageX - el.offsetLeft;
            var disy = e.pageY - el.offsetTop;*/
            /*document.onmousemove = function (e){
              el.style.left = e.pageX - disx + 'px';
              el.style.top = e.pageY - disy + 'px';
            }
            document.onmouseup = function(){
              document.onmousemove = document.onmouseup = null;
            }*/
            console.log(e.clientY)
            console.log(document.body.scrollTop)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.box1{width:100%;height: 80px;background: #ccc;line-height: 80px;font-size: 40px}
</style>
