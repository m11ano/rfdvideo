<template>
  <div class="title">Заявка на <span>подключение:</span></div>
  <div class="fields">
    <div>
      <div class="title">Ф.И.О.:</div>
      <div class="input"><input type="text" /></div>
    </div>
    <div>
      <div class="title">Контактный телефон:</div>
      <div class="input"><input type="text" ref="field_phone" v-model="values.phone" @focus="phoneFocused" /></div>
    </div>
  </div>
  <div class="button"><a href="javascript://" class="blue_button"><span><span><span class="text">Отправить</span></span></span></a></div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

import Inputmask from "inputmask";

export default defineComponent({
  data() {
    return {
      blocked : false,
        errors : [],
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