import {createStore} from 'vuex';

const store = createStore({
  state(){
    return {
      curContent: "portfolio",
      curProjectId: 0,
      projects: [
        // { id: 0, images: ['image1.jpg', 'image2.jpg'] },
        // { id: 1, images: ['image3.jpg', 'image4.jpg'] },
        // { id: 16, images: ['image5.jpg', 'image6.jpg'] },
      ]
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