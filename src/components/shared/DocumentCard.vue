<template>
  <div>
    <div class="card-main">
      <div class="card" style="width: 18rem; height: 32rem">
        <a target="_blank" :href="'http://localhost:8081/api/document/render/'+document.documentId">
          <img class="card-img-top" :src="image" alt="Card image cap">
        </a>
        <div class="card-body">
          <h5 class="card-title">{{document.documentName}}</h5>
          <div class="">
            <h6>Date:{{docCreatedAtDate}}</h6>
            <h6>Time: {{docCreatedAtTime}}</h6>
            <h6>Document ID: {{document.documentId}}</h6>
          </div>
          <a class="btn btn-secondary m-2" target="_blank" :href="'http://localhost:8081/api/document/download/'+document.documentId">Download</a>
          <a @click="documentInfo()" class="btn btn-primary m-2">More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentCard",
  props: {
    document:{},
    directory: {},
  },
  data() {
    return {
      image: "https://www.pngkey.com/png/detail/892-8928473_document-logo-rsum.png",
      docCreatedAtDate:null,
      docCreatedAtTime:null,
      currentUser: {},
      isUserSignedBefore: false,
    }
  },
  mounted() {
    this.formatDate();
    this.currentUser = JSON.parse(localStorage.getItem('user'));

  },
  computed: {

  },
  methods: {


    formatDate() {
      let dateTimeStamp = String(this.document.createdAt);
      this.docCreatedAtDate = dateTimeStamp.substring(0,10)
      this.docCreatedAtTime = dateTimeStamp.substring(11,19)
    },
    checkIfUserSignedBefore(userId) {
      this.document.signedUsers.forEach(i=> {
        if (i.id === userId) {
          this.isUserSignedBefore = true;
        }
      })

    },
    documentInfo() {
      this.$router.push({path:'/document/'+ this.document.documentId})
    }

  }
}
</script>

<style scoped>
.card-title~span {
  margin: 20px;
}

</style>