<template>
  <div class="portfolioWrap">
    <router-link v-for="(project, i) in curPorjects" :key="i" class="post" :to="`/post/${project.id}`">
      <div class="image" :style="{backgroundImage: `url(${project.imgUrl})`}"></div>
      <div class="postInfo">
        <div class="postTitle">{{project.title}}</div>
        <div class="postDescription">{{project.description}}</div>
      </div>
    </router-link>
  </div>

  <div class="pageNation">
    <a class="pageNumber" :class="{active: i==curPage}" v-for="i in totalPages" :key="i" @click="getPosts(i)">
      {{ i }}
    </a>
  </div>
</template>

<script>
import axios from '../axios.js'
export default {
  name: 'PortfolioPage',
  data() {
    return {
      curPorjects: [],
      totalPages: 0,
      curPage: 1
    }
  },
  async created(){
    try{
      const response = await axios.get('/api/posts');
      console.log(response.data);
      this.curPorjects = response.data.data.content;
      this.totalPages = response.data.data.totalPages;
      this.curPage = response.data.data.pageNumber;
    }catch(error){
      console.error(error);
    }
  },
  methods: {
    async getPosts(page){
      try{
        const response = await axios.get(`/api/posts?page=${page}`);
        console.log(response.data);
        this.curPorjects = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
        this.curPage = response.data.data.pageNumber;
      }catch(error){
        console.error(error);
      }
    },
  }
}
</script>

<style>

.portfolioWrap {
  display: flex;
  flex-wrap: wrap; /* 게시물들을 행으로 배치하고, 줄바꿈이 가능하게 함 */
  justify-content: flex-start; /* 게시물들을 왼쪽 정렬 */
  margin: -5px; /* 각 게시물 사이에 일정한 간격을 주기 위해 마진을 설정 */
  margin-left: 0px;
}

.post {
  width: calc(33% - 20px); /* 각 게시물의 너비를 계산하여 균등하게 배치 */
  background: white;
  margin: 3px; /* 각 게시물 사이에 일정한 간격을 설정 */
  overflow: hidden;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center; /* 콘텐츠를 중앙에 정렬 */
  text-decoration: none;
}

.post:hover {
  transform: translateY(-5px);
  color: inherit;
}

.image {
  width: 100%;
  aspect-ratio: 523 / 929; /* 이미지를 비율에 맞게 보여줌 */
  background-size: cover;
  background-position: center;
  object-fit: cover; /* 이미지의 비율을 유지하며 표시 */
}

.postInfo {
  padding: 10px;
  text-align: left;
  width: 100%;
  margin-bottom: 10px;
}

.postTitle {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 11px;
}

.postDescription {
  color: #666;
  line-height: 1.4;
  font-size: 11px;
}

.pageNation {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 0.9em;
  width: 100%;
}

.pageNumber {
  margin: 0 5px;
  padding: 5px 10px;
  color: #3B3838;
  cursor: pointer;
}

.active {
  color: #136AB2;
}

@media screen and (max-width: 768px) {
  .post {
    width: calc(100% ); /* Full width minus padding for smaller screens */
  }
  .pageNumber {
    margin: 0 3px;
    font-size: 10px;
  }
}
</style>
