<template>
  <div class="mainPage">
    <div class="wrapper">
      <div class="header">
        <router-link to="/" class="logoImg"></router-link>
      </div>
      <div v-if="!$store.state.isLogin" class="loginWrapper"> 
        <div class="title">관리자 로그인</div>
        <div class="subtitle">관리자만 접근 가능합니다.</div>
        <input type="text" v-model="id" placeholder="아이디"/>
        <input type="password" v-model="password" placeholder="비밀번호"/>
        <button class="loginBtn" :disabled="isLoading" @click="login">로그인</button>
      </div>

      <div v-if="$store.state.isLogin" class="logoutWrapper">
        <button class="logoutBtn" :disabled="isLoading" @click="logout">Logout</button>
      </div>

      <div v-if="$store.state.isLogin" class="optionsWrapper">
        <button class="optionBtn" 
          :class="{active: selectOption === 'portfolio'}" 
          @click="selectOption='portfolio'" :disabled="isLoading">
          Portfolio
        </button>

        <button class="optionBtn"
         :class="{active: selectOption === 'review'}"
         @click="selectOption='review'" :disabled="isLoading">
         Review
        </button>
      </div>

      <div v-if="$store.state.isLogin" class="content">
        <div v-if="selectOption==='portfolio'" class="portfolioInfo">
          <table class="portfolioTable">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>생성날짜</th>
                <th>수정날짜</th>
                <th>이동</th>
                <th>삭제</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(curContent, i) in curProjects" :key="i">
                <td>{{i+1}}</td>
                <td>{{curContent.title}}</td>
                <td>{{curContent.createDate}}</td>
                <td>{{curContent.updateDate}}</td>
                <td>
                  <button v-if="i+1 > 1" class="moveBtn" :disabled="isLoading" @click="moveUp(i)">↑</button>
                  <button v-if="i+1 < curProjects.length" class="moveBtn" :disabled="isLoading" @click="moveDown(i)">↓</button>
                </td>
                <td><button class="deleteBtn" :disabled="isLoading" @click="deletePost(curContent.id)">Delete</button></td>
                <td><button class="editBtn" :disabled="isLoading">Edit</button></td>
              </tr>
            </tbody>
          </table>

          <div class="buttonContainer">
            <button class="addBtn" @click="showModal = true" :disabled="isLoading">프로젝트 추가</button>
            <button class="sequenceBtn" :disabled="isLoading" @click="changeSequence">순서 적용</button>
          </div>
        </div>

        <div v-if="selectOption==='review'" class="reviewInfo">
          <table class="reviewTable">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>생성날짜</th>
                <th>수정날짜</th>
                <th>이동</th>
                <th>삭제</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(review, i) in curReviews" :key="i">
                <td>{{i+1}}</td>
                <td>{{review.title}}</td>
                <td>{{review.createDate}}</td>
                <td>{{review.updateDate}}</td>
                <td>
                  <button v-if="i + 1 > 1" class="moveBtn" :disabled="isLoading" @click="moveReviewUp(i)">↑</button>
                  <button v-if="i + 1 < curReviews.length" class="moveBtn" :disabled="isLoading" @click="moveReviewDown(i)">↓</button>
                </td>
                <td><button class="deleteBtn" :disabled="isLoading" @click="deleteReview(review.id)">Delete</button></td>
                <td><button class="editBtn" :disabled="isLoading">Edit</button></td>
              </tr>
            </tbody>
          </table>

          <div class="buttonContainer">
            <button class="addBtn" @click="showModal = true" :disabled="isLoading">리뷰 추가</button>
          </div>
        </div>
      </div>

      <div v-if="showModal" class="modalOverlay" @click.self="handleCloseModal">
        <div class="modalContent">
          <h2 v-if="selectOption==='portfolio'">프로젝트 추가</h2>
          <h2 v-if="selectOption==='review'">리뷰 추가</h2>
          <form @submit.prevent="uploadData">
            <label v-if="selectOption==='portfolio'" for="title">제목:</label>
            <input v-if="selectOption==='portfolio'" type="text" id="title" v-model="newProject.title"  required>
            
            <label v-if="selectOption==='portfolio'" for="description">설명:</label>
            <input v-if="selectOption==='portfolio'" type="text" id="description" v-model="newProject.description" required>

            <label v-if="selectOption==='portfolio'" for="mainImage">대표 이미지:</label>
            <input v-if="selectOption==='portfolio'" type="file" id="mainImage" @change="handleMainImageChange" required>

            <label v-if="selectOption==='portfolio'" for="portfolioImages">포트폴리오 이미지:</label>
            <input v-if="selectOption==='portfolio'" type="file" multiple id="portfolioImages" @change="handlePortfolioImagesChange" required>

            <label v-if="selectOption==='review'" for="reviewCustomer">고객:</label>
            <input v-if="selectOption==='review'" type="text" id="reviewCustomer" v-model="newReview.customer"  required>

            <label v-if="selectOption==='review'" for="reviewTitle">현장명:</label>
            <input v-if="selectOption==='review'" type="text" id="reviewTitle" v-model="newReview.title"  required>

            <label v-if="selectOption==='review'" for="content">내용:</label>
            <textarea v-if="selectOption==='review'" id="content" v-model="newReview.content" required></textarea>

            <label v-if="selectOption==='review'" for="image">이미지:</label>
            <input v-if="selectOption==='review'" type="file" id="image" @change="handleReviewImagesChange" required>
            
            <button type="submit" :disabled="isLoading">추가</button>
          </form>
          <div v-if="isLoading" class="loadingSpinner">Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios.js';

export default {
  name: 'AdminPage',
  data() {
    return {
      isLogin: false,
      id: '',
      password: '',
      selectOption: 'portfolio',
      showModal: false,
      isLoading: false,
      newProject: {
        title: '',
        description: '',
        mainImage: null,
        portfolioImages: []
      },
      newReview: {
        customer: '',
        title: '',
        content: '',
        image: null
      },
      curProjects: [],
      curReviews: [],
    }
  },
  async created(){
    try{
      const authToken = 'Bearer ' + this.$cookies.get('Authorization');
      const response = await axios.get('/api/admin/posts',{
        headers: { Authorization: authToken }
      });
      this.curProjects = response.data.data;
      console.log(this.curProjects);
      // this.isLogin = true; // Uncomment this line for testing to force the isLogin state to true
      this.$store.commit('updateIsLogin', true);
    }catch(error){
      console.error(error);
    }

    try{
      const authToken = 'Bearer ' + this.$cookies.get('Authorization');
      const response = await axios.get('/api/reviews',{
        headers: { Authorization: authToken }
      });
      console.log(response.data.data);
      this.curReviews = response.data.data;
    }catch(error){
      console.error(error);
    }
    

  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await axios.post('/login', { username: this.id, password: this.password });
        console.log(response.data);
        console.log(response.data.token);
          this.$cookies.set('Authorization', response.data.token, '1d', '', '', true, 'Strict');
          this.$store.commit('updateIsLogin', true);
      } catch (error) {
        console.error(error);
        alert('로그인 실패');
        this.$store.commit('updateIsLogin', false);
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.$cookies.remove('Authorization');
      this.$store.commit('updateIsLogin', false);
    },
    async uploadData() {
      if (this.selectOption === 'portfolio') {
        if (!this.newProject.portfolioImages || !this.newProject.mainImage || this.newProject.portfolioImages.length === 0) {
          alert('이미지를 넣어주세요.');
          return;
        }
      } else if (this.selectOption === 'review') {
        if (!this.newReview.image) {
          alert('이미지를 넣어주세요.');
          return;
        }
      }

      this.isLoading = true;

      const formData = new FormData();
      if (this.selectOption === 'portfolio') {
        formData.append('title', this.newProject.title);
        formData.append('description', this.newProject.description);
        formData.append('represent', this.newProject.mainImage);
        this.newProject.portfolioImages.forEach((image) => {
          formData.append('images', image);
        });
      } else if (this.selectOption === 'review') {
        formData.append('title', this.newReview.title);
        formData.append('content', this.newReview.content);
        formData.append('customer', this.newReview.customer)
        formData.append('image', this.newReview.image);
      
      }

      try {
        console.log(formData.get('title'));
        console.log(formData.get('content'));
        console.log(formData.get('image'));
        const authToken = 'Bearer ' + this.$cookies.get('Authorization');
        const response = await axios.post(this.selectOption === 'portfolio' ? '/api/post' : '/api/review', formData, {
          headers: {
           'Content-Type': 'multipart/form-data',
            'Authorization': authToken 
          }
        });
        console.log(response);
        alert(this.selectOption === 'portfolio' ? '새로운 프로젝트 생성했습니다.' : '새로운 리뷰 생성했습니다.');
      } catch (error) {
        alert(this.selectOption === 'portfolio' ? '프로젝트 생성을 실패했습니다.' : '리뷰 생성을 실패했습니다.');
      } finally {
        window.location.reload();
      }

      this.showModal = false;

      if (this.selectOption === 'portfolio') {
        this.newProject = {
          title: '',
          description: '',
          mainImage: null,
          portfolioImages: []
        };
      } else if (this.selectOption === 'review') {
        this.newReview = {
          title: '',
          description: '',
          images: []
        };
      }
    },
    handleMainImageChange(event) {
      const file = event.target.files[0];
      this.newProject.mainImage = file;
    },
    handlePortfolioImagesChange(event) {
      const files = Array.from(event.target.files);
      this.newProject.portfolioImages = files;
    },
    handleReviewImagesChange(event) {
      const file = event.target.files[0];
      this.newReview.image = file;
    },
    handleCloseModal() {
      if (!this.isLoading) {
        this.showModal = false;
      }
    },
    moveUp(index){
      const tmpProjects = this.curProjects.map(project =>{
        return {...project};
      });
  
      [tmpProjects[index], tmpProjects[index - 1]] = [tmpProjects[index - 1], tmpProjects[index]]
      tmpProjects.forEach((project, idx) =>{
        project.sequence = idx + 1;
      });

      this.curProjects = tmpProjects
    },
    moveDown(index){
      const tmpProjects = this.curProjects.map(project =>{
        return {...project};
      });
  
      [tmpProjects[index], tmpProjects[index + 1]] = [tmpProjects[index + 1], tmpProjects[index]]
      tmpProjects.forEach((project, idx) =>{
        project.sequence = idx + 1;
      });

      this.curProjects = tmpProjects
    },
    moveReviewUp(index) {
      const tmpReviews = this.curReviews.map(review => {
        return { ...review };
      });

      [tmpReviews[index], tmpReviews[index - 1]] = [tmpReviews[index - 1], tmpReviews[index]];
      tmpReviews.forEach((review, idx) => {
        review.sequence = idx + 1;
      });

      this.curReviews = tmpReviews;
    },
    moveReviewDown(index) {
      const tmpReviews = this.curReviews.map(review => {
        return { ...review };
      });

      [tmpReviews[index], tmpReviews[index + 1]] = [tmpReviews[index + 1], tmpReviews[index]];
      tmpReviews.forEach((review, idx) => {
        review.sequence = idx + 1;
      });

      this.curReviews = tmpReviews;
    },
    async changeSequence(){
      const changedSequenceInfo = this.curProjects.map(project => ({
        id: project.id,
        sequence: project.sequence
      }));
      
      try {
        const authToken = 'Bearer ' + this.$cookies.get('Authorization');
        const response = await axios.put('/api/post/sequence', changedSequenceInfo,{
          headers: { Authorization: authToken }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        alert('게시물의 순서를 변경했습니다.');
      }
    },
    async deletePost(postId) {
      if(window.confirm("정말로 삭제하기겠습니까?")){
        try{
          const authToken = 'Bearer ' + this.$cookies.get('Authorization');
          const response = await axios.delete(`/api/post/${postId}`,{
            headers: { Authorization: authToken }
          })
          console.log(response.data);
          alert('게시물이 삭제됐습니다.')
          window.location.reload();
        }catch(error){
          console.error(error);
          alert('삭제 실패');
        }
      }
    },
    async deleteReview(reviewId) {
      if(window.confirm("정말로 삭제하기겠습니까?")){
        try{
          const authToken = 'Bearer ' + this.$cookies.get('Authorization');
          const response = await axios.delete(`/api/review/${reviewId}`,{
            headers: { Authorization: authToken }
          })
          console.log(response.data);
          alert('리뷰가 삭제됐습니다.')
          window.location.reload();
        }catch(error){
          console.error(error);
          alert('삭제 실패');
        }
      }
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

.header {
  margin-bottom: 20px;
}

.loginWrapper {
  width: 400px;
  margin: 200px auto;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.loginWrapper .title {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
}

.loginWrapper .subtitle {
  font-size: 1em;
  margin-bottom: 20px;
  color: #888;
}

.loginWrapper input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.loginWrapper .loginBtn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-size: 1em;
}

.loginWrapper .loginBtn:disabled {
  background-color: #aaa;
}

.loginWrapper .loginBtn:hover:enabled {
  background-color: #555;
}

.logoutWrapper {
  margin-top: 150px;
  display: flex;
  justify-content: flex-end;
}

.logoutBtn {
  padding: 10px 15px;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.logoutBtn:hover {
  background-color: #333;
  color: white;
  border: white solid;
}

.optionsWrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.optionBtn {
  padding: 10px 20px;
  margin: 0 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  background-color: #555;
}

.optionBtn:hover {
  background-color: #222;
}

.optionBtn.active {
  background-color: #222;
}

.content {
  margin-top: 50px;
  width: 100%;
}

.portfolioTable, .reviewTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.portfolioTable th, .portfolioTable td, .reviewTable th, .reviewTable td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.portfolioTable th, .reviewTable th {
  background-color: #f2f2f2;
  color: black;
}

.portfolioTable tr:nth-child(even), .reviewTable tr:nth-child(even) {
  background-color: #f9f9f9;
}

.portfolioTable tr:hover, .reviewTable tr:hover {
  background-color: #f1f1f1;
}

.moveBtn, .deleteBtn, .editBtn {
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
}

.moveBtn {
  background-color: #007bff;
  color: white;
}

.moveBtn:hover {
  background-color: #0056b3;
}

.deleteBtn {
  background-color: #dc3545;
  color: white;
}

.deleteBtn:hover {
  background-color: #c82333;
}

.editBtn {
  background-color: #28a745;
  color: white;
}

.editBtn:hover {
  background-color: #218838;
}

.buttonContainer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.addBtn, .sequenceBtn {
  padding: 10px 20px;
  margin: 0 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  background-color: #007bff;
}

.addBtn:hover, .sequenceBtn:hover {
  background-color: #0056b3;
}

.reviewInfo {
  text-align: center;
}

/* Modal Styles */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modalContent {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modalContent h2 {
  margin-top: 0;
}

.modalContent form {
  display: flex;
  flex-direction: column;
}

.modalContent form label {
  margin-top: 10px;
}

.modalContent form input, .modalContent form textarea {
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.modalContent form button {
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1em;
}

.modalContent form button:hover {
  background-color: #0056b3;
}

.loadingSpinner {
  margin-top: 20px;
  text-align: center;
  font-size: 1.2em;
  color: #007bff;
}
</style>
