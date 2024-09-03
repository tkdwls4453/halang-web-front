<template>
  <div class="aboutWrapper">
    <div class="contentWrapper">
      <div class="textContent">
        <p>
          하랑 인테리어는 형태의 출발점인 ‘dot’을<br>
          기반으로 하여, 근본적인 틀에서 시작한다.<br>
          라인으로 짜여진 공간이 면을 이루어 연출되듯,<br>
          곳곳에 기초를 토대로 단계적인 형태를 만들어낸다.<br>
          기초에서 어긋나지 않은 시작을 주목하라.<br>
          그것이 곧, 그 공간의 정체성이 될 것이니.<br>
          <br>
          
          <span style="color:#136AB2;">懋 장대하다 ; 하</span><br>
          <span style="color:#136AB2;">浪 파도 ; 랑</span><br>
          <br>
          여러분의 공간은 하랑 인테리어와 함께 합니다.
        </p>
        <p>
          
        </p>
      </div>
      <div class="imageContent">
        <img src="../assets/images/about-man.jpg" alt="Image 1">
        <img src="../assets/images/about-girl.jpg" alt="Image 2">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutComponent',
  data() {
    return {
      // Add your data here
    }
  },
  methods: {
    // Add your methods here
  }
}
</script>

<style>
.aboutWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  margin-bottom: 60px;
}

.contentWrapper {
  display: flex;
  width: 90%; /* Adjusted to match the layout */
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap; /* 기본적으로 가로 방향 레이아웃 유지 */
}

.textContent {
  font-size: 16px; /* Adjusted font size */
  
  color: #333;
  margin-right: 40px; /* Adjusted spacing */
}

.textContent p {
  font-size: 12px;
  line-height: 24px; /* Adjusted line height */
}

.imageContent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageContent img {
  width: 252px; /* Adjusted image size */
  height: 252px; /* Adjusted image size */
  object-fit: cover;
  padding: 2px;
  /* margin-top: 11px; */
}

@media (max-width: 768px) {
  .aboutWrapper {
    margin-top: 300px;
    margin-bottom: 300px;
  }
  .contentWrapper {
    flex-wrap: wrap; /* 모바일에서는 세로 방향 레이아웃 */
    flex-direction: column; /* 세로 방향으로 변경 */
  }

  .textContent, .imageContent {
    margin-right: 0; /* 모바일에서 간격 제거 */
    width: 100%; /* 너비 100% */
    text-align: center; /* 텍스트 중앙 정렬 */
  }

  .imageContent {
    flex-direction: column; /* 이미지 세로 정렬 */
    align-items: center; /* 가운데 정렬 */
  }

  .imageContent img {
    width: 200px; /* 이미지 크기 줄이기 */
    height: 200px;
    margin-top: 10px; /* 이미지 상단 간격 조정 */
  }
}
</style>
