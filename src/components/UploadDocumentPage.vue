<template>
  <div style="margin-top: 100px">
    <div class="container">

      <div class="document-form-wrapper">
        <div class="row">
          <div class="col-md-4 document-upload-form">

            <button id="upload-document-btn"  @click="onPickFile">Upload Document</button>
            <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="application/pdf"
                @change="onFilePicked"/>
            <div id="file-name">{{filename}}</div>

            <div>
              <button @click="uploadFile()" v-if="document && selectedUsers.length!=0" class="btn btn-primary btn-lg">Send</button>
            </div>

          </div>
          <div class="col-md-4">

            <div class="users-wrapper">
              <h3>All Users</h3>
              <div class="users-list list-group">
                <div v-for="user in allUsers" :key="user.id">
                  <div @click="selectUser(user)">
                    <UserCard :user="user"/>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-md-4">

            <div class="users-wrapper">
              <h3>Selected Users</h3>
              <div class="list-group users-list">
                <div v-for="user in selectedUsers" :key="user.id">
                  <div @click="unSelectUser(user)">
                    <UserCard :user="user"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DocumentService from "@/service/DocumentService";
import UserCard from "@/components/shared/UserCard";
export default {
  name: "HomePage",
  components: {UserCard},
  data() {
    return {
      currentUser:{},
      document: null,
      filename:"",
      allUsers:[],
      selectedUsers:[],
      allUserTemp:[],
    }
  },
  computed:{

  },
  methods: {
    selectUser(user) {
      let set = new Set(this.allUsers);
      set.delete(user);
      this.allUsers = [...set];
      this.selectedUsers.push(user);
    },
    unSelectUser(user) {
      let set = new Set(this.selectedUsers);
      set.delete(user);
      this.selectedUsers = [...set];
      this.allUsers.push(user);
    },
    listAllUsers() {
        this.allUsers = this.allUserTemp;
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      this.filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {

      })
      fileReader.readAsDataURL(files[0])
      this.document = files[0]
      this.listAllUsers();
    },

    uploadFile() {
      const obj = {
        userIds: this.selectedUsers.map(i=>i.id)
      }
      const data = new FormData();
      const blob = new Blob([JSON.stringify(obj)], {
        type: 'application/json'
      });
      data.append('json', blob);
      data.append('file',this.document)
      DocumentService.uploadDoc(data,this.currentUser.id);
    }


  },

  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));

    DocumentService.allUsers()
        .then(res => {
          const set = new Set(res.data);

          set.forEach(i=> {
            if (i.id==this.currentUser.id) {
              set.delete(i);
            }
          })

          this.allUserTemp = [...set];
        })
        .catch(err => {
          console.log(err);
        })
  }
}
</script>

<style scoped>
@import "../assets/css/home-page.css";
</style>