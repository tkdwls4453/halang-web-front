<template>
  <div v-for="i in 3" :key="i" class="reviewWrap">
    <div class="review">
      <div class="reviewImage"></div>
      <div class="reviewContent">
        <div class="text">
          제 나이보다 오래된 구축 매수 후 네식구 실거주 할 생각하니 걱정되고 잠이 안와 아파트 이름과 평수로 인테리어 검색해 나온 모든 업체 인테리어를 보고, 그 중 몇군데 컨택한 후 최종 픽한 곳이예요^^ 몇시간에 걸친 사전 미팅으로 니즈 파악하고 저희 안이 실행 가능한지 협의하고, 공사 진행하다 생긴 다양한 일들 빠르게 소통 후 처리해 주셔서 맞벌이라 자주 들여다 보기 힘들었는데 기분 좋게 공사 끝냈습니다^^
          주방에서 거실이 일자로 이어지지 않는 불편한 구조인데, 거실과 안방 바꾸고 공간 나누는 대공사를 거쳐 아이둘 방, 드레스룸, 안방 꾸며서
          저희 가족 잘 지내고 있습니다^^  입주 후 살다보니, 찾은 문제 사항 2,3가지도 5월에 마무리 해주기로 하셨는데, 이것까지 보완하면 인테리어 완전 끝입니다. 대만족이에요~!!!
        </div>
        <div class="title">
          잠실 장미아파트 28평형 조**고객님
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewComponent",
}
</script>

<style scoped>
/* body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
} */
.reviewWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* border-radius: 10px; */
  overflow: hidden;
  width: 85%;
  margin: 100px 10px 100px 10px;
  /* max-width: 800px; */
  padding: 30px;
}
.review {
  display: flex;
  width: 100%;
}
.reviewImage {
  width: 400px;
  height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('../assets/images/background.png');
}
.reviewContent {
  padding: 20px;
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
}
.reviewContent .text {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}
.reviewContent .title {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
}
</style>
