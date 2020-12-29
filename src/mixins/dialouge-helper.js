import Vue from "vue";
import Component from "vue-class-component";
import { Loading, QSpinnerGears, QSpinnerIos } from "quasar";

@Component
class Dialog extends Vue {
  confirm(
    options = {
      message: "Would you like to remove.?",
      ok: `Yes, I'm sure`,
      color: "primary",
      spinner: QSpinnerIos
    }
  ) {
    return this.$q.dialog({
      title: "Remove this Smartphoto?",
      ...options,
      cancel: true,
      persistent: false
    });
  }
}
export default Dialog;
