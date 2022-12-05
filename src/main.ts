
import './assets/main.less';


import { createApp } from 'vue';
import ContactForm from './vue_components/ContactForm.vue';

const contactForm = createApp(ContactForm);
contactForm.mount('contact-form');

