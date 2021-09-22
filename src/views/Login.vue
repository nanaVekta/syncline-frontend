<template>
  <Header/>
  <div class=" container flex justify-center mt-10" id="login">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 class="mb-6">Login to your account</h3>
        <div class="mb-4">
          <input class="shadow appearance-none border rounded w-full py-2 px-3
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Enter Email">
        </div>

        <div class="mb-6">
          <input class="shadow appearance-none rounded w-full
          py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none
          focus:shadow-outline" id="password" type="password"
          placeholder="Enter Password">
        </div>
        <div class="flex items-center justify-center">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4
          rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';

@Options({
  components: {
    Header,
  },
})

export default class Login extends Vue {}
</script>
