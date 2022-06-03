import axios from 'axios';

const API_URL = 'http://localhost:8081/api/';

class DocumentService {

    getAllDocuments() {
        return axios.get(API_URL+'document/all')
    }

    allUsers() {
        return axios
            .get(API_URL + 'user/all');
    }

    officers() {
        return axios
            .get(API_URL + 'user/officers');
    }

    signingPendingDocuments(userId) {
        return axios.get(API_URL+'document/sign-pending-docs?userId='+userId)
    }

    approveDocument(documentId) {
        return axios.put(API_URL+'document/approve/'+documentId)
    }

    rejectDocument(documentId) {
        return axios.put(API_URL+'document/reject/'+documentId)
    }

    approvalPendingDocuments() {
        return axios.get(API_URL+'document/approval-pending-docs')
    }

    uploadDoc(formData,userId) {
        return axios.post(API_URL+'document/create-document?userId='+userId,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    uploadedDocByUser(userId) {
        return axios.get(API_URL+'document/user-docs?userId='+userId)
    }
    signedDocumentsByUser(userId) {
        return axios.get(API_URL+'document/signedDocs?userId='+userId)
    }
    assignedDocumentsByUser(userId) {
        return axios.get(API_URL+'document/assignedDocs?userId='+userId)
    }

    getDocumentInfoById(documentId) {
        return axios.get(API_URL+'document/' + documentId)
    }

    signDocument(userId,documentId) {
        return axios.put(API_URL+`document/sign-document?signingUserId=${userId}&documentId=${documentId}`)
    }

}

export default new DocumentService();
