export default function ({ $auth, redirect }) {
    if($auth.user && $auth.user.role !== 1) {
         redirect('/auth/login')
    }
}