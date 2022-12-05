<template>
  <div class="title">Заявка на <span>подключение:</span></div>
  <div class="fields">
    <div>
      <div class="title">Ф.И.О.:</div>
      <div class="input"><input type="text" v-model="values.name" /></div>
    </div>
    <div>
      <div class="title">Контактный телефон:</div>
      <div class="input"><input type="text" ref="field_phone" v-model="values.phone" @focus="phoneFocused" /></div>
    </div>
  </div>
  <div v-if="errors.length > 0" class="errors">
      <div class="content">
      <template v-for="(ert, eri) in errors" :key="eri">
          <div>— {{ert}}</div>
      </template>
      </div>
  </div>
  <div class="button"><a href="javascript://" @click="formSubmit" class="blue_button"><span><span><span class="text">Отправить</span></span></span></a></div>
  <div class="prev">Оставляя заявку на подключение, даю согласие на обработку персональных данных и принимаю условия <a href="https://rosfondom.ru/about/policy" target="_blank">Политики конфиденциальности</a></div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

import Inputmask from "inputmask";

export default defineComponent({
  data() {
    return {
      blocked : false,
      errors : [] as Array<String>,
      values : {
          name : '',
          phone : ''
      },
    }
  },
  setup(){
    return {};
  },
  methods : {

    clearErrors()
    {
        this.errors = [];
    },

    phoneFocused()
    {
        this.clearErrors();
    },

    async formSubmit(e : Event) {
      e.preventDefault();

      if (this.blocked)
      {
        return;
      }

      this.errors = [];

      if (this.values.name.length < 1)
      {
        this.errors.push('Заполните Ф.И.О.');
      }

      if (this.values.phone.length < 1)
      {
        this.errors.push('Заполните телефон');
      }

      if (this.errors.length == 0)
      {
        this.blocked = true;

        fetch(`http://localhost/engine/send.php`, {
          body: JSON.stringify(this.values),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            if (data.error !== undefined)
            {
              this.errors.push(data.error);
            }
            else
            {
              alert('Ваша заявка отправлена! В ближайшее время наш менеджер свяжется с Вами.');
              location.reload();
            }
        })
        .catch(async (e)=>{
          console.log(e);
        })
        .finally(()=>{
          this.blocked = false;
        });

      }
    }

  },
  computed : {


  },
  watch: {

  },
  mounted() {
    Inputmask({mask: "+7 (999) 999-99-99", clearIncomplete: true, onincomplete : ()=>{
      this.values.phone = '';
    }}).mask(this.$refs['field_phone'] as HTMLElement);
  }
});

</script>