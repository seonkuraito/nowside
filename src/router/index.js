import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import Create from '../views/Create.vue'
import Project from '../views/Project.vue'
import Success from '../views/Success.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'Signup',
      props: (route) => ({ NickName: route.params.NickName }),
      component: Signup,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
    },
    {
      path: '/accountedit',
      name: 'AccountEdit',
      component: () => import('../views/AccountEdit.vue'),
    },
    {
      path: '/accountproject',
      name: 'AccountProject',
      props: (route) => ({ projectType: route.params.projectType }),
      component: () => import('../views/AccountProject.vue'),
    },
    {
      path: '/accountmessage',
      name: 'AccountMessage',
      component: () => import('../views/AccountMessage.vue'),
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
    },
    {
      path: '/createsuccess/:projectId',
      name: 'CreateSuccess',
      props: (route) => ({ projectId: route.params.projectId }),
      component: () => import('../views/CreateSuccess.vue'),
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
    },
    {
      path: '/projectview/:projectId',
      name: 'ProjectView',
      props: (route) => ({ projectId: route.params.projectId }),
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/projectedit/:projectId',
      name: 'ProjectEdit',
      props: (route) => ({ projectId: route.params.projectId }),
      component: () => import('../views/ProjectEdit.vue'),
    },
    {
      path: '/projectmatch/:projectId',
      name: 'ProjectMatch',
      props: (route) => ({ projectId: route.params.projectId }),
      component: () => import('../views/ProjectMatch.vue'),
    },
    {
      path: '/projectapply/:projectId',
      name: 'ProjectApply',
      props: (route) => ({ projectId: route.params.projectId }),
      component: () => import('../views/ProjectApply.vue'),
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
    },
    {
      path: '/successview/:successId',
      name: 'SuccessView',
      props: (route) => ({ successId: route.params.successId }),
      component: () => import('../views/SuccessView.vue'),
    },
  ]
})

export default router
