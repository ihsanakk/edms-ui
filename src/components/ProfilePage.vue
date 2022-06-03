<template>
  <div>
    <div class="bg-secondary d-flex justify-content-around p-3">

      <!--      <button v-if="userRole==='USER'" id="show-uploaded-docXDF" class="btn btn-outline-light">Uploaded Documents</button>-->
      <button v-if="userRole==='OFFICER'" id="show-pending-doc" class="btn btn-outline-light">Pending Documents</button>
      <button v-if="userRole==='OFFICER'" id="show-assgnd-doc" class="btn btn-outline-light">Assigned Documents</button>
      <button v-if="userRole==='OFFICER'" id="show-sgnd-doc" class="btn btn-outline-light">Signed Documents</button>
      <!--      <button v-if="userRole==='AUTHORIZED'" id="show-pending-approve-doc" class="btn btn-outline-light">Approval Pending Documents</button>-->
      <button v-if="userRole==='AUTHORIZED'" id="show-all-doc" class="btn btn-outline-light">All Documents</button>
    </div>

    <div class="container">
      <div class="card-wrapper">
        <div v-if="currentDirectory==='All Documents' && userRole === 'AUTHORIZED'">
          <h2>{{ currentDirectory }}</h2>
          <h6 class="text-secondary" v-if="allDocuments.length ===0">No Documents to show</h6>
          <div class="d-flex justify-content-evenly">
            <div v-for="doc in allDocuments" :key="doc.id">
              <DocumentCard :document="doc"></DocumentCard>
            </div>
          </div>
        </div>
        <div v-if="currentDirectory==='Approval Pending Documents' && userRole === 'AUTHORIZED'">
          <h2>{{ currentDirectory }}</h2>
          <h6 class="text-secondary" v-if="approvalPendingDocs.length ===0">No pending documents</h6>
          <div class="d-flex justify-content-evenly">
            <div v-for="doc in approvalPendingDocs" :key="doc.id">
              <DocumentCard :document="doc"></DocumentCard>
            </div>
          </div>
        </div>
        <div v-if="currentDirectory==='Pending Documents'">
          <h2>{{ currentDirectory }}</h2>
          <h6 class="text-secondary" v-if="pendingDocs.length ===0">No pending documents</h6>
          <div class="d-flex justify-content-evenly">
            <div v-for="doc in pendingDocs" :key="doc.id">
              <DocumentCard v-if="doc.documentStatus!=='APPROVED' || doc.documentStatus!=='SIGNED'"
                            :document="doc"></DocumentCard>
            </div>
          </div>
        </div>
        <div v-if="currentDirectory==='Uploaded Documents'">
          <h2>{{ currentDirectory }}</h2>
          <h6 class="text-secondary" v-if="userUploadedDocs.length ===0">No uploaded documents</h6>
          <div class="d-flex justify-content-evenly">
            <div v-for="doc in userUploadedDocs" :key="doc.id">
              <DocumentCard :document="doc"></DocumentCard>
            </div>
          </div>
        </div>
        <div v-if="currentDirectory==='Assigned Documents'">
          <h2>{{ currentDirectory }}</h2>
          <h6 class="text-secondary" v-if="assignedDocs.length ===0">No assigned documents</h6>
          <div class="d-flex justify-content-evenly">
            <div v-for="doc in assignedDocs" :key="doc.id">
              <DocumentCard :document="doc"></DocumentCard>
            </div>
          </div>
        </div>
        <div v-if="currentDirectory=='Signed Documents'">
          <h2>{{ currentDirectory }}</h2>
          <h6 class="text-secondary" v-if="signedDocs.length ===0">No signed documents</h6>
          <div class="d-flex justify-content-evenly">
            <div v-for="doc in signedDocs" :key="doc.id">
              <DocumentCard :document="doc"></DocumentCard>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import DocumentCard from "@/components/shared/DocumentCard";
import $ from 'jquery'
import DocumentService from "@/service/DocumentService";

export default {
  name: "ProfilePage",
  components: {DocumentCard},
  data() {
    return {
      currentDirectory: 'Uploaded Documents',
      userUploadedDocs: [],
      signedDocs: [],
      assignedDocs: [],
      pendingDocs: [],
      approvalPendingDocs: [],
      currentUser: null,
      userRole: '',
      allDocuments: [],
    }
  },
  methods: {

    getAllDocuments() {

      DocumentService.getAllDocuments()
          .then(res => {
            this.allDocuments = res.data
          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          })

    },

    removeAll(originalSet, toBeRemovedSet) {
      [...toBeRemovedSet].forEach(function (v) {
        originalSet.delete(v);
      });
    },
    getUploadedDocumentsByUser(userId) {
      DocumentService.uploadedDocByUser(userId)
          .then(res => {
            this.userUploadedDocs = res.data;
          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    },
    getSignedDocs(userId) {
      DocumentService.signedDocumentsByUser(userId)
          .then(res => {
            this.signedDocs = res.data;


          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    },
    getApprovalPendingDocs() {
      DocumentService.approvalPendingDocuments()
          .then(res => {
            this.approvalPendingDocs = res.data
          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    },
    getSignPendingDocs(userId) {
      DocumentService.signingPendingDocuments(userId)
          .then(res => {
            this.pendingDocs = res.data;
          })
          .catch(error => {
            if (error.response) {
              alert(error.response.data.message)
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
    },
    getAssignedDocs(userId) {
      DocumentService.assignedDocumentsByUser(userId)
          .then(res => {
            this.assignedDocs = res.data

          })
          .catch(error => {
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
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.userRole = this.currentUser.role

    if (this.userRole === 'USER') {
      this.currentDirectory = "Uploaded Documents"
      this.getUploadedDocumentsByUser(this.currentUser.id)
    } else if (this.userRole === 'OFFICER') {
      this.currentDirectory = "Pending Documents"
    } else if (this.userRole === 'AUTHORIZED') {
      this.currentDirectory = 'Approval Pending Documents'
    }

    if (this.userRole === 'OFFICER') {
      this.getSignedDocs(this.currentUser.id);
      this.getAssignedDocs(this.currentUser.id);
      this.getSignPendingDocs(this.currentUser.id)
    }

    if (this.userRole === 'AUTHORIZED') {
      this.getApprovalPendingDocs()
      this.getAllDocuments();
    }

    $(document).on('click', '#show-sgnd-doc', () => {
      this.currentDirectory = $('#show-sgnd-doc').text();
    })
    $(document).on('click', '#show-assgnd-doc', () => {
      this.currentDirectory = $('#show-assgnd-doc').text();
    })
    $(document).on('click', '#show-pending-doc', () => {
      this.currentDirectory = $('#show-pending-doc').text();
    })
    $(document).on('click', '#show-all-doc', () => {
      this.currentDirectory = $('#show-all-doc').text();
    })


  }
}
</script>

<style scoped>

</style>