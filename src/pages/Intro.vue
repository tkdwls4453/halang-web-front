<template>
  <div class="introPage">
    <router-link to="/main" class="logoImg"></router-link>
  </div>
</template>

<script>
export default {
  name: 'IntroPage',
  data() {
    return {
      // Your data here
    }
  },
  computed: {
    // Your computed properties here
  },
  methods: {
    // Your methods here
  }
}
</script>

<style>
.introPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Viewport height, full screen height */
}

.logoImg {
  background-image: url('../assets/images/logo.png');
  background-size: contain; /* 이미지 비율을 유지하면서 컨테이너에 맞춤 */
  background-repeat: no-repeat; /* 이미지 반복을 막음 */
  background-position: center; /* 이미지 중앙 배치 */
  width: 200px; /* 컨테이너의 너비 설정 */
  height: 100px; /* 컨테이너의 높이 설정 */
  transition: transform 0.3s ease; /* 애니메이션 효과 추가 */
}

.logoImg:hover {
  transform: scale(1.1); /* 마우스 오버 시 크기를 1.1배로 키움 */
}
</style>
