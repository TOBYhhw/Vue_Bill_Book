import VueRouter from "vue-router";
import AboutAll from "../components/AboutAll"
import Main from "../components/Main"
export default new VueRouter({
    routes: [
        {
            path: "/AboutAll",
            component: AboutAll
        }, {
            path: "/Main",
            component: Main,

        },
        {
            path: "/",
            component: Main
        }

    ]
})