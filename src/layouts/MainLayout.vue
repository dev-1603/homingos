<template>
  <q-layout view="lHh Lpr lFf" class="layoutclass">
    <q-header elevated>
      <q-toolbar class="bg-accent col-12 row">
          <!-- class="absolute-left col-3" -->
        <q-img
          spinner-color="white"
          src="../assets/logomini.png"
          style="width: 35px; height: 45px; margin-left: 9px; margin-top: 5px;"
        />
        <!-- <q-space></q-space> -->
        <q-toolbar-title >
          Homingos
        </q-toolbar-title>

        <div v-if="!$q.platform.is.mobile && $q.screen.gt.md">
          A Smart Photography Application
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="q-pb-none q-mb-none">
      <!-- <q-parallax src="https://cdn.quasar.dev/img/parallax2.jpg"> -->
      <router-view />
      <!-- </q-parallax> -->
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev"
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework"
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev"
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev"
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev"
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev"
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev"
  }
];

export default {
  name: "MainLayout",
  // components: {  },
  data() {
    return {
      leftDrawerOpen: false
      // essentialLinks: linksData
    };
  }
};
</script>
<style scoped>
.layoutclass {
  background: #ae9fe9;
}
</style>
