<template>
  <div>
    <div  class="bg-light d-flex justify-content-around p-3">
      <button @click="signDocument()" v-if="userRole==='OFFICER' && !isUserSignedBefore" class="btn btn-outline-success">SIGN</button>
      <h5 class="text-info" v-if="isUserSignedBefore">You have signed this document</h5>
      <button @click="approveDocument()" v-if="userRole==='AUTHORIZED' && document.documentStatus !=='APPROVED' && document.documentStatus ==='SIGNED'" class="btn btn-outline-primary">APPROVE</button>
      <button @click="rejectDocument()"  v-if="userRole==='AUTHORIZED' && document.documentStatus !=='APPROVED' && document.documentStatus ==='SIGNED'" class="btn btn-outline-warning">REJECT</button>
    </div>

    <div class="mt-5 container">
      <div class="d-flex justify-content-around">
        <div class="col-md-3">
          <h3>Document Info</h3>
          <hr>
          <h5 class="text-secondary text-capitalize">Document Id: <span
              class="text-dark">{{ document.documentId }}</span></h5>
          <h5 class="text-secondary text-capitalize">Document Name: <span
              class="text-dark">{{ document.documentName }}</span></h5>
          <h5 class="text-secondary text-capitalize">Created Date: <span class="text-dark">{{ docCreatedAtDate }}</span>
          </h5>
          <h5 class="text-secondary text-capitalize">Created Time: <span class="text-dark">{{ docCreatedAtTime }}</span>
          </h5>
          <br>
          <br>
          <h5 class="text-secondary text-capitalize">Publisher User Name: <span
              class="text-dark">{{ document.publisherUser.name }}</span></h5>
          <h5 class="text-secondary text-capitalize">Publisher User Lastname: <span
              class="text-dark">{{ document.publisherUser.lastname }}</span></h5>
<!--          <h5 v-if="currentUser.department || currentUser.department !== ''" class="text-secondary text-capitalize">Publisher User Department: <span-->
<!--              class="text-dark">{{ document.publisherUser.department }}</span></h5>-->
          <br>
          <br>
          <h5 class="text-info">{{document.documentStatus}}</h5>
          <h5 v-if="document.currentDepartment" class="text-info">Currently in {{document.currentDepartment}}</h5>
        </div>
        <div v-if="userRole==='AUTHORIZED' || userRole==='OFFICER'" class="col-md-3">
          <h3>Signatures</h3>
          <hr>
          <ul class="list-group">

            <h6 class="text-secondary" v-if="document.signatureSet.length ===0">No signature applied yet</h6>
            <li class="list-group-item text-dark" style="font-size: 14px" v-for="signature in document.signatureSet"
                :key="signature.id">
              {{ signature.signatureText }}
            </li>

          </ul>
        </div>
        <div v-if="userRole==='AUTHORIZED' || userRole==='OFFICER'" class="col-md-3">
          <h3>Signed Users</h3>
          <hr>
          <ul class="list-group">
            <h6 class="text-secondary" v-if="document.signedUsers.length ===0">No signed user</h6>
            <li class="list-group-item" v-for="user in document.signedUsers" :key="user.id">
              <h6 class="text-dark text-capitalize"><span class="text-secondary">Name: </span> {{ user.name }}</h6>
              <h6 class="text-dark text-capitalize"><span class="text-secondary">Last Name: </span> {{ user.lastname }}
              </h6>
              <h6 class="text-dark text-capitalize"><span class="text-secondary">Department: </span>
                {{ user.department }}</h6>
            </li>

          </ul>
        </div>
        <div class="col-md-3">
          <h3>Assigned Users</h3>
          <hr>
          <ul class="list-group">
            <h6 class="text-secondary" v-if="document.assignedUsers.length ===0">No assigned user</h6>
            <li class="list-group-item" v-for="user in document.assignedUsers" :key="user.id">
              <h6 class="text-dark text-capitalize"><span class="text-secondary">Name: </span> {{ user.name }}</h6>
              <h6 class="text-dark text-capitalize"><span class="text-secondary">Last Name: </span> {{ user.lastname }}
              </h6>
              <h6 class="text-dark text-capitalize"><span class="text-secondary">Department: </span>
                {{ user.department }}</h6>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentService from "@/service/DocumentService";
export default {
  name: "DocumentPage",
  props: {},
  data() {
    return {
      document: {},
      currentUser:{},
      userRole:"",
      image: "https://www.pngkey.com/png/detail/892-8928473_document-logo-rsum.png",
      docCreatedAtDate: null,
      docCreatedAtTime: null,
      isUserSignedBefore:false
    }
  },
  methods: {
    approveDocument() {
      if (confirm("Are you sure?\nYou're about the approve a document.")) {
        DocumentService.approveDocument(this.document.documentId)
            .then(res => {
              alert(res.data.message)
              location.reload();
            })
            .catch(function (error) {
              if (error.response) {
                alert(error.response.data.message)
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
            })
      }
    },
    rejectDocument() {
      if (confirm("Are you sure?\nYou're about the reject a document.")) {
        DocumentService.rejectDocument(this.document.documentId)
            .then(res => {
              alert(res.data.message)
              location.reload();
            })
            .catch(function (error) {
              if (error.response) {
                alert(error.response.data.message)
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
            })
      }
    },
    signDocument() {
      if (confirm("Are you sure?\nYou're about the signing a document.")) {
        DocumentService.signDocument(this.currentUser.id,this.document.documentId)
            .then(res => {
              alert(res.data.message)
              location.reload();
            })
            .catch(function (error) {
              if (error.response) {
                alert(error.response.data.message)
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
            })

      }
    },

  },
  created() {

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.userRole = this.currentUser.role

  },
  mounted() {
    DocumentService.getDocumentInfoById(this.$route.params.id)
        .then(res => {
          this.document = res.data
          let dateTimeStamp = String(res.data.createdAt);
          this.docCreatedAtDate = dateTimeStamp.substring(0, 10)
          this.docCreatedAtTime = dateTimeStamp.substring(11, 19)

          this.document.signedUsers.forEach(u => {
            if (u.id===this.currentUser.id) {
              this.isUserSignedBefore = true;
            }
          })

        })
  }
}
</script>

<style scoped>

.col-md-3 {
  padding-top: 10px;
  border: 1px solid #1371cc;
  border-radius: 10px;
  height: 500px;
  margin-right: 5px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}

.text-secondary {
  font-size: 12px;
}

.text-dark {
  font-size: 12px;
}

</style>