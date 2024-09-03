<template>
  <div v-for="review in reviews" :key="review" class="reviewWrap">
    <div class="review">
      <div class="reviewImage" :style="{backgroundImage: `url(${review.image})`}" ></div>
      <div class="reviewContent">
        <div class="text">
          {{ review.content }}
        </div>
        <div class="title">
          {{review.title}}
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
  async created(){
    try{
      const response = await axios.get("/api/reviews")
      console.log(response.data);
      this.reviews = response.data.data;
    }catch(error){
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
