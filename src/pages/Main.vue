<template>
  <div class="mainPage">
    <div class="wrapper">
      <Nav></Nav>
      <div class="content">
        <Portfolios v-if="$store.state.curContent === 'portfolio'"/>
        <About v-if="$store.state.curContent === 'about'"/>
        <Contact v-if="$store.state.curContent === 'contact'"/>
        <Detail v-if="$store.state.curContent === 'details'"/>
        <Review v-if="$store.state.curContent === 'review'"/>
      </div>


      <div class="footer">
        <p class="company">하랑 인테리어</p>
        <p>
          경기도 성남시 수정구 위례광장로 328, 우성위례타워 805호 <br />
          대표 : 임형태 | 전화 : 010-3690-9407 | 이메일 : halanginterior@naver.com <br />
          ⓒ 2022. 하랑인테리어 All Rights Reserved. <br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Portfolios from '../components/Portfolios.vue'; 
import Review from '../components/Review.vue';

export default {
  name: 'MainPage',
  data() {
    return {
    }
  },
  components:{
    About,
    Contact,
    Nav,
    Portfolios,
    Review
  }
}
</script>

<style>

.mainPage {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 70%;
}

.content{
  margin-top: 150px;
}

.footer{
  padding-top: 20px;
}
.footer p.company {
  font-size: 1.0rem;
  /* color: #3B3808; */
  text-align: left;
  margin-bottom: 5px;
}

.footer p {
  font-size: 0.8rem;  
  line-height: 1.7;
  margin: 0px;
}

@media (max-width: 600px) {
  .wrapper {
    width: 100%;
  }
  .footer p.company {
  font-size: 0.75em;
  /* color: #3B3808; */
  text-align: left;
  }

  .footer p {
    font-size: 0.5rem;  
    line-height: 1.5;
    margin: 0px;
  }
}
</style>
