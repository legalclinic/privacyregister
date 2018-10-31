// this is where all the routes will be, it specifies which view to take with which url extension
import Vue from 'vue';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

// routing components and pages
import Welcome from '@/views/Welcome';
import Conditions from '@/views/Conditions';
import OrganisationCreate from '@/views/OrganisationCreate';
import OrganisationUpload from '@/views/OrganisationUpload';
import OrganisationAccept from '@/views/OrganisationAccept';
import Root from '@/views/Root';
import ProcessChoice from '@/views/home/ProcessChoice';
import YourOrganisation from '@/views/home/YourOrganisation';
import OrganisationEdit from '@/views/home/OrganisationEdit';
import ExportBackup from '@/views/home/ExportBackup';
import Export from '@/views/home/Export';
import ControllerActivities from '@/views/home/ControllerActivities';
// eslint-disable-next-line
import ProcessorActivities from '@/views/home/ProcessorActivities';
import AboutPrivacyRegister from '@/views/home/AboutPrivacyRegister';
import Faq from '@/views/home/Faq';

Vue.use(Router);
Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      props: {
        visible: false,
        navLocation: 'top',
        location: 'Welcome',
      },
    },
    {
      path: '/conditions',
      name: 'Conditions',
      component: Conditions,
      props: {
        visible: false,
        navLocation: 'top',
        location: 'Conditions',
      },
    },
    {
      path: '/organisation',
      name: 'OrganisationCreate',
      component: OrganisationCreate,
      props: {
        visible: false,
        navLocation: 'top',
        location: 'Create Organisation',
      },
    },
    {
      path: '/review',
      name: 'OrganisationAccept',
      component: OrganisationAccept,
      props: {
        visible: false,
        navLocation: 'top',
        location: 'Review organisation data',
      },
    },
    {
      path: '/upload',
      name: 'OrganisationUpload',
      component: OrganisationUpload,
      props: {
        visible: false,
        navLocation: 'top',
        location: 'Upload Organisation',
      },
    },
    {
      path: '/home',
      name: 'Root',
      component: Root,
      redirect: '/home/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'ProcessChoice',
          component: ProcessChoice,
          props: {
            visible: true,
            navLocation: 'top',
            location: 'Dashboard',
            icon: 'home',
          },
        },
        {
          path: 'organisation',
          name: 'YourOrganisation',
          component: YourOrganisation,
          props: {
            visible: true,
            navLocation: 'top',
            location: 'Your Organisation',
            icon: 'person',
          },
        },
        {
          path: 'organisation/edit',
          name: 'OrganisationEdit',
          component: OrganisationEdit,
          props: {
            visible: false,
            navLocation: 'top',
            location: 'Your Organisation',
            icon: 'person',
          },
        },
        {
          path: 'exportjson',
          name: 'ExportBackup',
          component: ExportBackup,
          props: {
            visible: true,
            navLocation: 'top',
            location: 'Export Backup',
            icon: 'save_alt',
          },
        },
        {
          path: 'export',
          name: 'Export',
          component: Export,
          props: {
            visible: true,
            navLocation: 'top',
            location: 'Export Excel/CSV',
            icon: 'save_alt',
          },
        },
        {
          path: 'activities-controller',
          name: 'ControllerActivities',
          component: ControllerActivities,
          props: {
            visible: true,
            navLocation: 'top',
            location: 'Controller Activities',
            icon: 'bar_chart',
          },
        },
        {
          path: 'activities-processor',
          name: 'ProcessorActivities',
          component: ProcessorActivities,
          props: {
            visible: true,
            navLocation: 'top',
            location: 'Processor Activities',
            icon: 'bar_chart',
          },
        },
        {
          path: 'about',
          name: 'About Privacy Register',
          component: AboutPrivacyRegister,
          props: {
            visible: true,
            navLocation: 'bottom',
            location: 'About Privacy Register',
            icon: 'info',
          },
        },
        {
          path: 'faq',
          name: 'Faq',
          component: Faq,
          props: {
            visible: true,
            navLocation: 'bottom',
            location: 'FAQ',
            icon: 'question_answer',
          },
        },
      ],
    },
  ],
});
