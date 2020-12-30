<template>
  <div>
    <div class="row">
      <span
        :class="$q.screen.lt.sm ? 'text-h5' : 'text-h3'"
        class=" text-grey-3 bg-pink-5 col-12 text-underline"
        style="text-align:center"
        >IMAGE GALLERY</span
      >
      <q-icon
        name="fas fa-sign-out-alt"
        flat
        :size="$q.screen.lt.sm ? 'md' : 'xl'"
        unelevated
        class="text-white"
        style="position: absolute;top: 50px;right: 20px;z-index:300; opacity: 1;"
        @click="$router.push('/')"
        ><q-tooltip max-height="30%" max-width="25%">
          <div class="tooltip-content">
            Sign Out
          </div>
        </q-tooltip>
      </q-icon>
    </div>

    <q-page-sticky
      :style="$q.platform.is.mobile || $q.screen.lt.md ? 'z-index:200' : ''"
      position="bottom-right"
      :offset="[25, 25]"
    >
      <!-- Proceed To CheckOut -->
      <q-btn
        label="Save and Continue"
        unelevated
        dense
        size="lg"
        color="pink-5"
        icon-right="send"
        rounded
        class="float-right q-ma-sm"
        @click="SaveData()"
      ></q-btn>
    </q-page-sticky>
    <div
      :style="
        $q.platform.is.desktop || $q.screen.gt.md ? '' : 'margin-bottom:70px'
      "
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
            ><q-btn
              icon="add_box"
              size="xl"
              align="center"
              label="Add File"
              flat
              color="white"
              unelevated
              @click="Uploadfile = true"
            ></q-btn
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
              $q.platform.is.mobile || $q.screen.lt.md
                ? 'width:80vw'
                : 'width:40vw'
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
                  <q-item-section style="max-width:85px">
                    <q-img
                      :src="image.url"
                      spinner-color="white"
                      style=" max-width: 70px"
                      :style="
                        $q.platform.is.mobile || $q.screen.lt.md
                          ? 'height: 50px;width:13.5vw'
                          : 'height: 70px;width:8vw'
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
    <q-dialog
      v-model="Uploadfile"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        flat
        :style="
          !maximizedToggle
            ? $q.platform.is.mobile || $q.screen.lt.md
              ? 'width:100vw ;max-width:500px; height:320px'
              : 'width: 600px; max-width: 80vw'
            : ''
        "
      >
        <q-bar class="bg-primary text-white">
          <span class="text-subtitle2">Upload Files</span>
          <q-space />
          <q-btn
            dense
            flat
            icon="fas fa-compress"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <uploder />
        </q-card-section>
      </q-card>
    </q-dialog>
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
  },
  components: {
    uploder: () => import("./uploader")
  }
})
class Dashboard extends Vue {
  data() {
    return {
      videos: [],
      showList: false,
      Uploadfile: false,
      maximizedToggle: false
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

    this.$q.loading.show({
      spinner: QSpinnerIos,
      message:
        '<b>Data</b> fetching is in progress.<br/><span class="text-primary">Hang on...</span>'
    });
    axios
      .get("https://www.mocky.io/v2/5ed5fda4340000740006d560?mocky-delay=500ms")
      .then(response => {
        const { data } = response;
        this.$q.loading.hide();
        this.videos = _.cloneDeep(data);
        _.forEach(this.videos, v => {
          v["selectedframe"] = v.frames[0].id;
        });
        if (this.videos.length < 5) {
          this.videos.push({ id: "new" });
        }
        this.updatePhotos(_.cloneDeep(this.videos));

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
      this.updatePhotos(_.cloneDeep(this.videos));
      this.showList = true;
    });
  }

  SaveData() {
    const Data = _.cloneDeep(this.getphotos);
    const SaveData = _.map(Data, x => {
      const obj = { id: x.id, frameId: x.selectedframe };
      return obj;
    });
    const url = "https://www.mocky.io/v2/5ed609363400004d0006d602";
    var self = this;
    console.log(this.$q);
    this.$q.loading.show({
      spinner: QSpinnerIos,
      message:
        '<b>Data</b> Data etting saved .<br/><span class="text-primary">Hang on...</span>'
    });
    axios({
      method: "post",
      url: url,
      data: JSON.stringify(SaveData)
    }).then(
      response => {
        console.log(self);
        self.$q.loading.hide();
        self.$q.notify({
          message: "Data Saved Sucessfully...",
          type: "positive"
        });
        self.$router.push("/");

        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
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
