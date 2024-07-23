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
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 20px;
}

.post {
  width: calc(33.333% - 40px); /* Adjust this value to fit your layout */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the items */
  padding: 10px;
  text-decoration: none;
}

.post:hover {
  transform: translateY(-5px);
   color: inherit;
}

.image {
  width: 100%;
  aspect-ratio: 523 / 929; /* Set the aspect ratio, adjust as needed */
  background-size: cover;
  background-position: center;
  /* background-image: url('@/assets/images/background.png'); */
  object-fit: cover; /* Ensure the aspect ratio is maintained */
  margin-bottom: 20px; /* Add some space between the image and post info */
}

.postInfo {
  padding: 10px;
  text-align: left; /* Center align the text */
  width: 100%; /* Make the postInfo span the entire width */
}

.postTitle {
  font-weight: bold;
  margin-bottom: 10px; /* Increase margin for better spacing */
  font-size: 13px;
}

.postDescription {
  color: #666;
  line-height: 1.4;
  font-size: 11px;
}

.pageNation{
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 0.9em;
  width: 100%; 
}

.pageNumber{
  margin: 0 5px;
  padding: 5px 10px;
  color: #3B3838;
  cursor: pointer;
}
.active{
  color: #136AB2;
}
</style>
