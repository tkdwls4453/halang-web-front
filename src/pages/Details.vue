<template>
  <div class="mainPage">
    <div class="wrapper">
      <div class="header">
        <router-link to="/" class="logoImg"></router-link>
      </div>
      <div class="image-gallery">
        <div class="image-item" v-for="(image, index) in displayedImages" :key="index" :style="{ backgroundImage: `url(${image})` }">
        </div>
        <div ref="loadMoreTrigger" class="load-more-trigger"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios.js';

export default {
  name: 'DetailsPage',
  data() {
    return {
      images: [],
      displayedImages: [],
      itemsToLoad: 10,
      observer: null,
    }
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await axios.get(`/api/posts/${id}`);
      this.images = response.data.data;
      this.displayedImages = this.images.slice(0, this.itemsToLoad);
      this.setupObserver();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    loadMore() {
      const nextIndex = this.displayedImages.length;
      const nextImages = this.images.slice(nextIndex, nextIndex + this.itemsToLoad);
      this.displayedImages = [...this.displayedImages, ...nextImages];
    },
    setupObserver() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMore();
          }
        });
      }, {
        rootMargin: '200px',
      });

      if (this.$refs.loadMoreTrigger) {
        this.observer.observe(this.$refs.loadMoreTrigger);
      }
    }
  },
  beforeUnmount() {
    if (this.observer && this.$refs.loadMoreTrigger) {
      this.observer.unobserve(this.$refs.loadMoreTrigger);
    }
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

.header {
  margin-bottom: 20px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
}

.image-item {
  position: relative;
  flex: 1 1 45%;
  margin: 5px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 70%;
}

.load-more-trigger {
  width: 100%;
  height: 20px;
}

@media (max-width: 600px) {
  .image-item {
    flex: 1 1 100%;
    padding-top: 100%;
  }
}
</style>
