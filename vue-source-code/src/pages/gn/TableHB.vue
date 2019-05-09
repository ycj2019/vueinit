<template>
    <div>
      <table>
          <thead>
              <th v-for="n in 6">类目{{n}}</th>
          </thead>
          <tbody>
              <tr v-for="n in iteam">
                <td :rowspan="n.agespan" :class="{hidden: n.agedis}">{{n.age}}</td>
                <td :rowspan="n.agespan" :class="{hidden: n.agedis}">{{n.age}}</td>
                <td>{{n.name}}</td>
                <td>{{n.age}}</td>
                <td :rowspan="n.agespan" :class="{hidden: n.agedis}">{{n.name}}</td>
                <td>{{n.age}}</td>
              </tr>
          </tbody>
        <!--:rowspan="nspan" :class="{hidden: ndis}"-->
          <!--<tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tfoot>-->
      </table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "tablehb",
        data(){
          return {
            iteam:[
              {
                name:'aaa',
                age:111
              },
              {
                name:'bbb',
                age:222
              },
              {
                name:'bbb',
                age:222
              },
              {
                name:'ddd',
                age:444
              },
              {
                name:'eee',
                age:555
              },
              {
                name:'fff',
                age:666
              }
            ]
          }
        },
        created(){
          this.getData(this.iteam)
          console.log(this.iteam)
        },
        methods:{
          getData(list){//合并table--可查询
            //console.log(list[0]);
            for ( let field in list[0]) {
              var k = 0;
              while (k < list.length) {
                list[k][field + 'span'] = 1;
                list[k][field + 'dis'] = false;
                for (var i = k + 1; i <= list.length - 1; i++) {
                  if (list[k][field] == list[i][field] && list[k][field] != '') {
                    list[k][field + 'span']++;
                    list[k][field + 'dis'] = false;
                    list[i][field + 'span'] = 1;
                    list[i][field + 'dis'] = true;
                  } else {
                    break;
                  }
                }
                k = i;
              }
            }
            return list;
          },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
table{
  thead{
    th{
        width: 200px; height: 100px;background: #DADADA;
    }
  }
  tbody{
    tr{
      td{width: 200px; height: 100px;background: #aaa;
      }
      .hidden{display: none}
    }
  }
  tfoot{
    tr{
      td{

      }
    }
  }
}
</style>
