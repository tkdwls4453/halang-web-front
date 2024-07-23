import {createStore} from 'vuex';

const store = createStore({
  state(){
    return {
      curContent: "portfolio",
      curProjectId: 0,
      projects: [
      ],
      isLogin: false,
    }
  },

  mutations: {
    updateCurContent(state, newContent){
      state.curContent = newContent;
    },
    udpateProjectId(state, id){
      state.curProjectId = id;
    },
    updateProjectImages(state, { id, images }) {
      const project = state.projects.find(project => project.id === id);
      if (project) {
        project.images = images;
      }
    },
    addProject(state, newProject) {
      state.projects.push(newProject);
    },
    updateIsLogin(state, newIsLogin) {
      state.isLogin = newIsLogin;
    }
  },
  getters: {
    getProjectImagesById: (state) => (id) => {
      const project = state.projects.find(project => project.id === id);
      return project ? project.images : [];
    }
  }
})

export default store;