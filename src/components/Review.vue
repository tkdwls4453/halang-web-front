<template>
  <div v-for="review in reviews" :key="review" class="reviewWrap">
    <div class="review">
      <img :src="review.image" alt="Review Image" class="reviewImage" />
      <div class="reviewContent">
        <div class="title">
          {{ review.title }}
        </div>
        <div class="text">
          {{ review.content }}
        </div>

        <div class="customer">
          {{ review.customer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios.js';
export default {
  name: "ReviewComponent",
  data() {
    return {
      reviews: []
    }
  },
  async created() {
    try {
      const response = await axios.get("/api/reviews")
      console.log(response.data);
      this.reviews = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.reviewWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  overflow: hidden;
  padding-top: 30px;
}

.review {
  display: flex;
  width: 100%;
  align-items: flex-start; /* 이미지와 텍스트의 위쪽 라인을 맞춥니다. */
  flex-wrap: wrap; /* 모바일에서 레이아웃이 잘리지 않도록 감싸기 설정 */
}

.reviewImage {
  width: 400px;
  height: auto; /* 이미지가 비율에 맞게 조정되도록 설정 */
  object-fit: contain; /* 이미지가 컨테이너 내에 맞춰지도록 설정 */
  margin-bottom: 20px; /* 이미지와 텍스트 사이에 간격 추가 */
  flex-shrink: 0; /* 이미지 크기가 줄어들지 않도록 설정 */
}

.reviewContent {
  text-align: left;
  width: calc(100% - 430px); /* 이미지 크기와 여백을 고려한 가변 너비 설정 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 텍스트의 정렬을 위쪽으로 맞춥니다. */
  margin-left: 30px;
}

.reviewContent .title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #555;
}

.reviewContent .text {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.reviewContent .customer {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  align-self: flex-end; /* 고객 정보가 오른쪽에 붙도록 설정합니다. */
  margin-left: auto; /* 고객 정보가 오른쪽에 정렬되도록 합니다. */
}

/* 반응형 스타일 적용 */
@media (max-width: 768px) {
  .review {
    flex-direction: column; /* 작은 화면에서 레이아웃을 세로로 변경 */
  }

  .reviewImage {
    width: 100%; /* 이미지가 화면 전체를 차지하도록 설정 */
    height: auto; /* 이미지의 비율을 유지하도록 자동 높이 조정 */
    margin-bottom: 20px; /* 이미지와 텍스트 사이의 간격 추가 */
  }

  .reviewContent {
    width: 100%; /* 텍스트 영역이 전체 너비를 차지하도록 설정 */
    margin-left: 0; /* 왼쪽 여백 제거 */
    padding: 0 10px; /* 양쪽에 패딩 추가 */
  }

  .reviewContent .title {
    font-size: 18px; /* 타이틀 글자 크기 조정 */
  }

  .reviewContent .text, 
  .reviewContent .customer {
    font-size: 13px; /* 본문과 고객 정보의 글자 크기 조정 */
  }
}

@media (max-width: 480px) {
  .reviewWrap {
    padding: 20px; /* 더 작은 패딩으로 조정 */
  }

  .reviewContent .title {
    font-size: 16px; /* 더 작은 화면에서 타이틀 글자 크기 조정 */
  }

  .reviewContent .text, 
  .reviewContent .customer {
    font-size: 12px; /* 본문과 고객 정보의 글자 크기 더 작게 조정 */
  }
}
</style>
