<template>
  <div class="header">
        <router-link to="/" class="logoImg"></router-link>
        <div class="tap">
          <ul>
            <li :class="{ active: $store.state.curContent === 'portfolio' }" @click="$store.commit('updateCurContent', 'portfolio')">PORTFOLIO</li>
            <li :class="{ active: $store.state.curContent === 'about' }" @click="$store.commit('updateCurContent', 'about')">ABOUT</li>
            <li :class="{ active: $store.state.curContent === 'contact' }" @click="$store.commit('updateCurContent', 'contact')">CONTACT</li>
            <li><a href="https://blog.naver.com/success221120">BLOG</a></li>
            <li><a href="https://www.instagram.com/halanginterior_official?igsh=Mm9ncHVvM2JzMG13">INSTAGRAM</a></li>
            <li><a href="https://www.youtube.com/@halanginterior">YOUTUBE</a></li>
            <li :class="{ active: $store.state.curContent === 'review' }" @click="curContent = 'review'">REVIEW</li>
          </ul>
        </div>
  </div>
  <div style="height: 100px;"></div>
      
</template>

<script>
export default {
  name: "NavComponent"
}
</script>

<style>

.header {
  width: 82%;
  z-index: 10;
  position: fixed;
  top: 0;
  background-color: white;
}

.logoImg {
  display: block;
  width: 150px; /* 컨테이너의 너비 설정 */
  height: 70px; /* 컨테이너의 높이 설정 */
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
  margin-top: 30px;
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


</style>