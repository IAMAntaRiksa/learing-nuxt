export default function ({ $auth, redirect }) {
    if ($auth.loggedIn) {
        // admin
        if ($auth.strategy.name == "admin") {
            return redirect('/admin/dashboard')
        }
        // customer
        if ($auth.strategy.name == "customer") {
            return redirect('/customer/dashboard')
        }
    }
}