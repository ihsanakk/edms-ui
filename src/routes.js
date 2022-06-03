import LoginPage from "@/components/LoginPage";
import RegisterPage from "@/components/RegisterPage"
// import HomePage from "@/components/HomePage";
import UploadDocumentPage from "@/components/UploadDocumentPage"
import ProfilePage from "@/components/ProfilePage";
import DocumentPage from "@/components/DocumentPage";
export const routes = [

    {path: '/login', component:  LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/', component: UploadDocumentPage},
    {path:'/upload', component: UploadDocumentPage},
    {path: '/me', component: ProfilePage},
    {
        path: '/document/:id',
        component: DocumentPage,
        params: {
            data: {}
        },
        props: true
    }
]