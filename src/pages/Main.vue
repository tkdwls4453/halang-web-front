<template>
  <div class="mainPage">
    <div class="wrapper">
      <div class="header">
        <router-link to="/" class="logoImg"></router-link>
        <div class="tap">
          <ul>
            <li :class="{ active: curContent === 'portfolio' }" @click="curContent = 'portfolio'">PORTFOLIO</li>
            <li :class="{ active: curContent === 'about' }" @click="curContent = 'about'">ABOUT</li>
            <li :class="{ active: curContent === 'contact' }" @click="curContent = 'contact'">CONTACT</li>
            <li><a href="https://blog.naver.com/success221120">BLOG</a></li>
            <li><a href="https://www.instagram.com/halanginterior_official?igsh=Mm9ncHVvM2JzMG13">INSTAGRAM</a></li>
            <li><a href="https://www.youtube.com/@halanginterior">YOUTUBE</a></li>
            <li :class="{ active: curContent === 'review' }" @click="curContent = 'review'">REVIEW</li>
          </ul>
        </div>
      </div>


      <div class="content">
        <About v-if="curContent === 'about'"/>
      </div>


      <div class="footer">
        <h4>하랑 인테리어</h4>
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
import About from '../components/About.vue';
export default {
  name: 'MainPage',
  data() {
    return {
      curContent: 'portfolio'
    }
  },
  components:{
    About
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
  width: 85%;
}

.header {
  width: 100%;
}

.logoImg {
  display: block;
  width: 180px; /* 컨테이너의 너비 설정 */
  height: 100px; /* 컨테이너의 높이 설정 */
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
}

.logoImg:hover {
  transform: scale(1.1); /* 마우스 오버 시 크기를 1.1배로 키움 */
}

.tap ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
}

.tap li {
  margin-right: 20px; /* 리스트 항목 간의 간격 설정 */
  font-size: 13px;
}

.tap li a{
  text-decoration: none;
  color: inherit; /* 부모 요소의 색상 상속 */
  cursor: pointer; /* 마우스 포인터를 손가락 모양으로 변경 */
}

.tap li:hover {
  color: #136AB2;
  cursor: pointer;
}

.tap li.active {
  color: #136AB2; /* 활성화된 탭의 색상 */
}

.content {
  height: 60vh;
}

.footer {}

.footer h3 {
  font-size: 1.0rem;
  color: #3B3808;
  text-align: left;
}

.footer p {
  font-size: 0.8rem;
  margin-left: 10px;
  line-height: 1.7;
}
</style>
