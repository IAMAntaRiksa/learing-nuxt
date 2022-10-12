export default function ({ $auth, redirect }) {
    // loggendIn false
    if (!$auth.loggedIn) {
        return redirect('/admin/login')
    }
    // check admin role
    if ($auth.strategy.name != 'admin') {
        return redirect('/admin/login')
    } else {
        return true
    }
}