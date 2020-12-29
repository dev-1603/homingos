<template>
  <div id="q-app">
    <router-view />
    <q-dialog v-model="spinner" :maximized="true" full-height>
      <q-card class="column full-height transparent">
        <q-card-section class="col q-pt-none">
          <div class="q-gutter-md fixed-center z-max">
            <div>
              <q-spinner-ios color="primary" size="2em" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { mapState, mapGetters, mapActions } from "vuex";

@Component({
  computed: {
    ...mapGetters("common", ["qSpinner"])
  }
})
class App extends Vue {
  data() {
    return {
      spinner: false
    };
  }
  @Watch("qSpinner", { deep: true })
  handleSpinnerChanges(val) {
    this.$nextTick(() => {
      this.spinner = val;
    });
  }
}
export default App;
</script>
