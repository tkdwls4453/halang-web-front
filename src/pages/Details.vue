<template>
  <div class="mainPage">
    <div class="wrapper">
      <div class="header">
        <router-link to="/" class="logoImg"></router-link>
      </div>
      <div class="image-gallery">
        <div class="image-item" v-for="(image, index) in displayedImages" :key="index">
          <img :src="image" alt="image" />
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
    };
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
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadMore();
            }
          });
        },
        {
          rootMargin: '200px',
        }
      );

      if (this.$refs.loadMoreTrigger) {
        this.observer.observe(this.$refs.loadMoreTrigger);
      }
    },
  },
  beforeUnmount() {
    if (this.observer && this.$refs.loadMoreTrigger) {
      this.observer.unobserve(this.$refs.loadMoreTrigger);
    }
  },
};
</script>

<style>
.mainPage {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  margin-bottom: 20px;
}

.image-gallery {
  display: flex;
  flex-direction: column; /* 이미지를 세로로 정렬합니다. */
  gap: 0; /* 이미지 사이의 모든 간격을 제거합니다. */
  width: 100%; /* 이미지 갤러리의 너비를 전체로 설정합니다. */
  align-items: center; /* 이미지를 가운데 정렬합니다. */
}

.image-item {
  width: 80%; /* 각 이미지의 너비를 전체 폭의 80%로 설정하여 크기를 줄입니다. */
  max-width: 600px; /* 이미지의 최대 너비를 제한하여 너무 커지지 않도록 설정합니다. */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block; /* 이미지가 잘리지 않고, 공백 없이 배치되도록 합니다. */
}

.load-more-trigger {
  width: 100%;
  height: 20px;
}

@media (max-width: 600px) {
  .image-item {
    width: 100%; /* 작은 화면에서는 이미지의 크기를 조금 더 크게 설정합니다. */
  }
}
</style>
