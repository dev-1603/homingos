<template>
  <div class="imgsize" :style="{ backgroundImage: 'url(' + background + ')' }">
    <div
      class="absolute column items-center"
      :style="{
        opacity: 0.9,
        top: $q.screen.lt.md ? 25 + '%' : 30 + '%',
        left: 0,
        right: 0
      }"
    >
      <q-card
        :class="$q.screen.lt.md ? 'q-mt-md q-ml-xs' : ''"
        style="max-width:90vw"
        class="my-card q-col-gutter-xs"
      >
        <!-- <q-img
          spinner-color="white"
          size="sm"
          style="max-width:80vw"
          src="../assets/logo_full.png"
          :ratio="17 / 8"
        /> -->
        <q-card-section>
          <h4>Smartphotos</h4>
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Start Tour"
            color="primary"
            to="/dashboard"
            icon-right="fas fa-sign-in-alt"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { mapMutations, mapGetters, mapActions } from "vuex";
import { Dialog } from "src/mixins/index";
import { Loading, QSpinnerGears, QSpinnerIos } from "quasar";
var backgroundimg = require("../assets/background.jpg");
@Component({
  mixins: [Dialog],
  methods: {
    ...mapMutations("common", ["toggleSpinner"]),
    ...mapActions("common", ["updatePhotos"])
  },
  computed: {
    ...mapGetters("common", ["getphotos"])
  },
  components: {
    uploder: () => import("./uploader")
  }
})
class Intro extends Vue {
  data() {
    return {
      background: backgroundimg
    };
  }
}
export default Intro;
</script>

<style>
html {
  background-color: #cedce7 !important;
  background: url("../assets/background.jpg") no-repeat center fixed;
  background-size: cover;
}
.imgsize {
  width: 100vw;
  height: 93vh;
  background-size: cover;
}

.my-card {
  height: 50%;
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  border-top: 5px solid #04acca;
  opacity: 0.9;
}
.image {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.q-checkbox {
  justify-content: center;
}
a {
  color: #757575;
}
a:hover {
  color: #04acca;
  text-decoration: underline;
  cursor: pointer;
}
</style>
