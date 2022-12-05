
import './assets/main.less';


import { createApp } from 'vue';
import ContactForm from './vue_components/ContactForm.vue';

const contactForm = createApp(ContactForm);
contactForm.mount('contact-form');


class FuncsLib {
    
    windowScrollToBlock(v : string, offset = 0, is_smooth = true)
    {
        const elem = document.getElementById(v);
        if (elem !== null)
        {
            this.windowScrollToElem(elem, offset, is_smooth);
        }
    }

    windowScrollToElem(i : HTMLElement, offset = 0, is_smooth = true)
    {

        let s = i.getBoundingClientRect().top + window.pageYOffset - offset;
        if (is_smooth)
        {
            this.windowScrollTo(s);
        }
        else
        {
            window.scrollTo({ top: s });
        }
    }

    windowScrollTo(v : number)
    {
        window.scrollTo({ top: v, behavior: 'smooth' });
    }
}

declare global {
    interface Window { funcsLib: FuncsLib; }
}

window.funcsLib = new FuncsLib();