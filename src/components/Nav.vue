<template>
  <div class="header">
    <router-link to="/" class="logoImg"></router-link>
    <div class="tap">
      <ul class="nav-links" @click="hideMenu">
        <li :class="{ active: $store.state.curContent === 'portfolio' }" @click="$store.commit('updateCurContent', 'portfolio')">PORTFOLIO</li>
        <li :class="{ active: $store.state.curContent === 'about' }" @click="$store.commit('updateCurContent', 'about')">ABOUT</li>
        <li :class="{ active: $store.state.curContent === 'contact' }" @click="$store.commit('updateCurContent', 'contact')">CONTACT</li>
        <li><a href="https://blog.naver.com/success221120">BLOG</a></li>
        <li><a href="https://www.instagram.com/halanginterior_official?igsh=Mm9ncHVvM2JzMG13">INSTAGRAM</a></li>
        <li><a href="https://www.youtube.com/@halanginterior">YOUTUBE</a></li>
        <li :class="{ active: $store.state.curContent === 'review' }" @click="$store.commit('updateCurContent', 'review')">REVIEW</li>
      </ul>
      <div class="hamburger" @click="toggleMenu">
        &#9776;
      </div>
      <div class="close-btn" @click="toggleMenu">
        &times;
      </div>
    </div>
  </div>
  <div style="height: 100px;"></div>
</template>

<script>
export default {
  name: "NavComponent",
  methods: {
    toggleMenu() {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('nav-active');
    },
    hideMenu() {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
      }
    }
  }
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
  width: 130px;
  height: 50px;
  transition: transform 0.3s ease;
  margin-top: 30px;
  margin-bottom: 50px;
}

.logoImg:hover {
  transform: scale(1.1);
}

.tap {
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px
}

.tap ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
}

.tap li {
  margin-right: 20px;
  font-size: 12px;
}

.tap li a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.tap li:hover {
  color: #136AB2;
  cursor: pointer;
}

.tap li.active {
  color: #136AB2;
}

.hamburger {
  display: none;
  font-size: 30px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: -30px; /* Adjust to position close to the right edge */
}

.close-btn {
  display: none;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  position: fixed;
  top: 10px;
  right: 10px;
}

@media screen and (max-width: 768px) {
  .logoImg {
    width: 100px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .tap {
    display: flex;
    margin-right: 30px
  }
  .tap ul {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .tap ul.nav-active {
    display: flex;
  }

  .tap li {
    margin: 10px 0;
    text-align: center;
  }

  .hamburger {
    display: block;
    margin-left: auto;
    padding: 10px;
  }

  .hamburger.nav-active {
    display: none;
  }

  .close-btn {
    display: none;
  }

  .nav-active ~ .close-btn {
    display: block;
  }
}
</style>
