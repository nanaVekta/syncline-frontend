<template>
  <Popover open="true" class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6
      md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center
          justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <router-link to="/login" class="whitespace-nowrap text-base font-medium text-gray-500
          hover:text-gray-900">
            Sign in
          </router-link>
          <router-link to="register" class="ml-8 whitespace-nowrap inline-flex items-center
          justify-center px-4 py-2 border border-transparent rounded-md shadow-sm
          text-base font-medium text-white bg-green-600 hover:bg-green-700">
            Sign up
          </router-link>
        </div>
      </div>
    </div>

    <transition enter-active-class="duration-200 ease-out"
    enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
    leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95">
      <PopoverPanel focus class="absolute top-0 inset-x-0 p-2 transition transform
      origin-top-right md:hidden">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white
        divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              </div>
              <div class="-mr-2">
                <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center
                justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div>
              <a href="#" class="w-full flex items-center justify-center px-4 py-2
              border border-transparent rounded-md shadow-sm text-base font-medium
              text-white bg-green-600 hover:bg-green-700">
                Sign up
              </a>
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                Existing user?
                {{ ' ' }}
                <a href="#" class="text-green-600 hover:text-green-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue';
import {
  IdentificationIcon,
  MenuIcon,
  BookOpenIcon,
  XIcon,
  UserGroupIcon,
} from '@heroicons/vue/outline';

const resources = [
  {
    name: 'About Us',
    href: '#',
    icon: BookOpenIcon,
  },
  {
    name: 'Our Team',
    href: '#',
    icon: UserGroupIcon,
  },
  {
    name: 'Career',
    href: '#',
    icon: IdentificationIcon,
  },
];

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    MenuIcon,
    XIcon,
  },
  setup() {
    return {
      resources,
    };
  },
};
</script>
