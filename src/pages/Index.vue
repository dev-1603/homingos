<template>
  <div>
    <div style="align:cnter">
      <h5>Dashboard</h5>
    </div>
    <div class="row q-pa-md q-mt-none q-gutter-md" v-if="videos.length">
      <q-list v-for="(item, index) in videos" :key="index">
        <q-item>
          <q-item-section
            style="max-width:400px"
            :style="
              $q.platform.is.mobile || $q.screen.lt.md
                ? 'width:89vw'
                : 'width:40vw'
            "
            ><q-video :ratio="16 / 9" :src="item.url" />

            <div class="row q-mt-xs">
              <div v-for="(image, index) in item.frames" :key="index">
                <q-item
                  class="q-pa-none q-pr-xs"
                  clickable
                  v-ripple
                  @click="item.selectedframe = image"
                >
                  <!-- active-class="my-menu-link" -->
                  <!-- :active="item.selectedframe.url === image.url" -->
                  <q-item-section style="max-width:85px">
                    <q-img
                      :src="image.url"
                      spinner-color="white"
                      style="height: 70px; max-width: 76px"
                      :style="
                        $q.platform.is.mobile || $q.screen.lt.md
                          ? 'width:17vw'
                          : 'width:7vw'
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

export default {
  name: "PageIndex",
  data() {
    return {
      videos: []
    };
  },
  mounted() {
    axios
      .get("http://www.mocky.io/v2/5ed5fda4340000740006d560?mocky-delay=500ms")
      .then(response => {
        const { data } = response;
        this.videos = data;
        _.forEach(this.videos, v => {
          v["selectedframe"] = v.frames[0];
        });
      })
      .catch(error => console.log(error));
  }
};
</script>
<style scoped></style>
