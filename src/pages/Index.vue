<template>
  <div>
    <!-- {{ $q.platform }} -->
    <div
      :style="$q.platform.is.desktop || $q.screen.gt.md ? '' : ''"
      class=" row q-mt-none q-gutter-xl q-px-md "
      v-if="showList"
    >
      <q-list v-for="(item, index) in videolist" :key="index">
        <q-item
          v-if="item.id === 'new'"
          class="Itemclass"
          style="background:grey"
        >
          <span class="text-bold">
            {{ index + 1 }}
          </span>
          <q-item-section
            style="max-width:400px; height:320px"
            class="q-mt-lg col-xs-10"
            :style="
              $q.platform.is.mobile || $q.screen.lt.md
                ? 'width:80vw'
                : 'width:40vw'
            "
          ></q-item-section>
        </q-item>
        <q-item v-else class="Itemclass">
          <span class="text-bold">
            {{ index + 1 }}
          </span>
          <q-btn
            size="md"
            flat
            round
            style="color:red"
            class="deletebutton q-mb-lg"
            icon="far fa-trash-alt"
            @click="deleteitem(index)"
          >
            <q-tooltip max-height="30%" max-width="25%">
              <div class="tooltip-content">
                Delete
              </div>
            </q-tooltip>
          </q-btn>
          <q-item-section
            style="max-width:400px"
            class="q-mt-lg col-xs-10"
            :style="
              $q.platform.is.mobile || $q.screen.lt.md ? '' : 'width:40vw'
            "
            ><q-video :ratio="16 / 9" :src="item.url" />

            <div class="row q-mt-xs  q-gutter-sm">
              <div v-for="(image, i) in item.frames" :key="i">
                <q-item
                  class="q-pa-none"
                  clickable
                  v-ripple
                  :class="
                    item.selectedframe === image.id
                      ? 'activeimage'
                      : 'notactiveimg'
                  "
                  :active="item.selectedframe === image.id"
                  @click="setimage(image, index)"
                >
                  <!-- active-class="my-menu-link" -->
                  <q-item-section style="max-width:85px">
                    <q-img
                      :src="image.url"
                      spinner-color="white"
                      style="height: 70px; max-width: 70px"
                      :style="
                        $q.platform.is.mobile || $q.screen.lt.md
                          ? 'width:16vw'
                          : 'width:8vw'
                      "
                    />
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
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
@Component({
  mixins: [Dialog],
  methods: {
    ...mapMutations("common", ["toggleSpinner"]),
    ...mapActions("common", ["updatePhotos"])
  },
  computed: {
    ...mapGetters("common", ["getphotos"])
  }
})
class Dashboard extends Vue {
  data() {
    return {
      videos: [],
      showList: false
    };
  }
  get videolist() {
    if (this.videos.length < 5) {
      this.videos.push({ id: "new" });
    }

    return this.videos;
  }

  beforeDestroy() {
    if (this.$q.loading.isActive) {
      this.$q.loading.hide();
    }
  }

  mounted() {
    // this.toggleSpinner(true)
    this.$q.loading.show({
      spinner: QSpinnerIos,
      message:
        '<b>Data</b> fetching is in progress.<br/><span class="text-primary">Hang on...</span>'
    });
    axios
      .get("http://www.mocky.io/v2/5ed5fda4340000740006d560?mocky-delay=500ms")
      .then(response => {
        const { data } = response;
        this.$q.loading.hide();
        this.videos = data;
        _.forEach(this.videos, v => {
          v["selectedframe"] = v.frames[0].id;
        });
        if (this.videos.length < 5) {
          this.videos.push({ id: "new" });
        }
        this.updatePhotos(this.videos);
        // this.toggleSpinner(false)

        this.showList = true;
      })
      .catch(error => console.log(error));
  }

  setimage(image, index) {
    this.showList = false;
    this.$set(this.videos[index], "selectedframe", image.id);
    this.showList = true;
  }
  deleteitem(index) {
    this.deleteitem;
    const msg = {
      message:
        "photos uploaded for this video will be deleted as well. Do you want to continue ?"
    };
    this.confirm(msg).onOk(() => {
      this.showList = false;
      this.videos.splice(index, 1);
      this.updatePhotos(this.videos);
      this.showList = true;
    });
  }
}
export default Dashboard;
</script>
<style scoped>
.Itemclass {
  background: rgb(220, 227, 255);
  border: 1px solid #ae9fe9;
  border-radius: 20px;
}
.divitem {
  position: relative;
  width: 60px;
}
.deletebutton {
  position: absolute;
  top: 1px;
  right: 0px;
  z-index: 300;
  opacity: 0.8;
}
.activeimage {
  background: #06b52f;
  border: 5px solid #06a711;
  /* border-radius: 20px; */
}
.notactiveimg {
  border: 0px transparent #ffffff;
}
</style>
