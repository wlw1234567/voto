import index from './components/index'
import apply from './components/apply'
import self from './components/self'
import rank from './components/rank'


export const routes=[
    
    {
      path:'/',
      name:"indexLink",
      components:{default:index},
      meta:{
      title:"老虎钳2019最美代言人"
      }
    },

    {
      path:'/apply',
    name:"applyLink",
    component:apply,
    meta:{
      title:"老虎钳代言人报名"
      }
    },

    {
    path:'/self',
    name:"selfLink",
    component:self,
    meta:{
      title:"老虎钳代言人个人信息"
      }
    },

    {
    path:'/rank',
    name:"rankLink",
    component:rank,
    meta:{
      title:"老虎钳2019最美代言人排行榜"
      }
    },

    {
    path:'*',
    redirect:'/'
    },
  ]

  