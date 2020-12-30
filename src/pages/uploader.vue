<template>
  <div class="row q-gutter-sm">
    <q-uploader
      url="http://localhost:4444/upload"
      label="Image List"
      color="pink-5"
      style="min-height:200px"
      :style="$q.screen.lt.md ? 'width:100%' : 'width:48%'"
      multiple
      accept=".jpg, .png,    image/*"
      @rejected="onRejected"
      max-files="5"
    >
      <template v-slot:list="scope">
        <q-list separator>
          <q-item v-for="file in scope.files" :key="file.name">
            <q-btn
              dense
              flat
              icon="delete"
              color="red"
              style="z-index:100; position:absolute;top: 1px; right: 1px;"
              @click="deletepic(scope, file)"
              ><q-tooltip max-height="30%" max-width="25%">
                <div class="tooltip-content">
                  Delete
                </div>
              </q-tooltip>
            </q-btn>
            <!-- thumbnail -->
            <q-item-section v-if="file.__img" class="">
              <q-img :src="file.__img.src" />
            </q-item-section>
            <!-- <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
                <q-tooltip max-height="30%" max-width="25%">
                  <div class="tooltip-content">
                    {{ file.name }}
                  </div>
                </q-tooltip>
              </q-item-label>

              <q-item-label caption> Status: {{ file.__status }} </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section> -->
          </q-item>
        </q-list>
      </template>
    </q-uploader>
    <q-uploader
      url="http://localhost:4444/upload"
      color="pink-5"
      label="video"
      style="min-height:200px"
      :style="$q.screen.lt.md ? 'width:100%' : 'width:48%'"
      accept=".mkv, .mp4, video/*"
      max-files="1"
    >
      <template v-slot:list="scope">
        <q-list separator>
          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
                <q-tooltip max-height="30%" max-width="25%">
                  <div class="tooltip-content">
                    {{ file.name }}
                  </div>
                </q-tooltip>
              </q-item-label>

              <q-item-label caption> Status: {{ file.__status }} </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-uploader>
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
class uploader extends Vue {
  data() {
    return {};
  }

  deletepic(scope, file) {
    this.confirm().onOk(() => {
      scope.removeFile(file);
    });
  }

  checkFileType(files) {
    return files.filter(file => file.type === "image/png");
  }

  onRejected(rejectedEntries) {
    this.$q.notify({
      type: "negative",
      message: `${rejectedEntries.length} file(s) did not pass validation constraints`
    });
  }
}
export default uploader;
</script>

<style></style>
