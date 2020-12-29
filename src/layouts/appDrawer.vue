<template>
  <div>
    <!-- Included application header here -->
    <!-- <app-header @drawerAction="handleDrawerState" /> -->
    <q-drawer
      v-model="drawer"
      side="left"
      class="app-font"
      bordered
      show-if-above
      :width="200"
      :breakpoint="200"
      :mini="!drawer || miniState"
      @click="handleMenuClick(false)"
    >
      <!-- @mouseover="miniState = false"
      @mouseout="miniState = true" -->

      <div style="height: 50px;">
        <q-img
          v-if="miniState"
          class="absolute-top"
          spinner-color="white"
          src="../assets/profileLogo.png"
          style="width: 35px; height: 45px; margin-left: 9px; margin-top: 5px;"
        />
        <q-img
          v-else
          @click="miniState = !miniState"
          spinner-color="white"
          class="absolute-top"
          src="../assets/logo.png"
          style="width: 130px; margin-left: 12px;"
        />
      </div>
      <div class="q-mini-drawer-hide absolute" style="top: 50px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          @click="handleMenuClick(true)"
        />
      </div>
    </q-drawer>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "loadsh";
import { mapState, mapMutations } from "vuex";
import Component from "vue-class-component";

@Component({
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapMutations("common", ["updatedrawerstate"])
  }
})
class AppDrawer extends Vue {
  data() {
    return {
      drawer: false,
      link: this.link ? this.link : "dashboard",
      childLink: "",
      subChildLink: "",
      childGroupLink: "",
      childGroupItemsLink: "",
      groupLink: "",
      miniState: true,
      urlState: "",
      childExpansion: false
    };
  }

  get isExpanded() {
    return !!_.find(this.groupMenuListItems, menu =>
      _.find(menu.childItems, { route: this.$route.path })
    );
  }

  // Get URL for Image
  get url() {
    return this.$nextTick(() => {
      this.urlState = this.miniState
        ? "../assets/profileLogo.png"
        : "../assets/logo.png";
    });
  }

  // Declared as computed property getter
  get menuListItems() {
    return [
      {
        id: 1,
        icon: "fa fa-th",
        label: this.$t("drawer.dashboard"),
        value: "dashboard",
        header: "",
        isMobileMenu: false,
        route: "/dashboard"
      },
      {
        id: 2,
        icon: "fas fa-tasks",
        isMobileMenu: true,
        label: "Task",
        value: "task",
        route: "/task"
      },
      // {
      //   id: 10,
      //   icon: 'fas fa-tasks',
      //   isMobileMenu: true,
      //   label: 'Plan Task',
      //   value: 'plan-task',
      //   route: '/plan-task'
      // },
      {
        id: 3,
        isMobileMenu: true,
        icon: "far fa-handshake",
        label: this.$t("drawer.salesCall"),
        value: "sales-call",
        route: "/sales-call"
      },
      {
        id: 4,
        isMobileMenu: true,
        icon: "far fa-address-card",
        label: this.$t("drawer.account"),
        value: "account",
        route: "/account"
      },
      {
        id: 5,
        icon: "fas fa-list",
        isMobileMenu: false,
        label: this.$t("Project"),
        value: "project",
        route: "/project"
      },
      {
        id: 6,
        icon: "far fa-file-alt",
        isMobileMenu: false,
        label: this.$t("drawer.prpsal"),
        value: "proposalDashboard",
        route: "/proposalDashboard"
      },
      {
        id: 7,
        icon: "far fa-list-alt",
        isMobileMenu: false,
        label: "RFQ register",
        value: "rfq-register",
        route: "/rfq-register"
      },
      // {
      //   id: 8,
      //   value: 'opportunity',
      //   route: '/opportunity',
      //   isMobileMenu: false,
      //   icon: 'fas fa-th-large',
      //   label: 'Opportunity'
      // },
      {
        id: 9,
        value: "template",
        route: "/template",
        isMobileMenu: false,
        icon: "fab fa-wpforms",
        label: this.$t("drawer.template")
      }
    ];
  }

  get groupMenuListItems() {
    var staticMenuItem = [];

   

    return staticMenuItem;
  }


  beforeMount() {
    if (localStorage.getItem("sd_menu_state")) {
      this.miniState = localStorage.getItem("sd_menu_state") === "true";
    }
  }

  // NOTE On refresh of Application, set the active link based on the active path
  mounted() {
    var currentRoute = _.split(this.$router.currentRoute.fullPath, "/");
    this.link = currentRoute[1];
    if (this.$q.screen.lt.sm || this.$q.platform.ios || this.$q.platform.mobile)
      this.miniState = true;
    if (currentRoute[1] === "layout") {
      this.link = "dashboard";
    }
  }

  handleMenuClick(state) {
    this.miniState = state;
    this.updatedrawerstate({ drawer: this.drawer, miniState: this.miniState });
    localStorage.setItem("sd_menu_state", state);
  }

  handleMenuListItems(link, route) {
    if (this.$q.screen.lt.sm || this.$q.platform.ios || this.$q.platform.mobile)
      this.miniState = true;
    this.link = link;
    this.groupLink = "";
    this.childLink = "";
    this.childExpansion = false;
    this.childGroupItemsLink = "";
    if (this.$route.path !== route) this.$router.push(route);
  }

  handleDrawerState(val) {
    this.$nextTick(() => {
      this.drawer = !this.drawer;
      this.updatedrawerstate({
        drawer: this.drawer,
        miniState: this.miniState
      });
    });
  }

  handleChildMenuListItems(link, route) {
    if (this.$q.screen.lt.sm || this.$q.platform.ios || this.$q.platform.mobile)
      this.miniState = true;
    this.childLink = link;
    this.link = "";
    // this.groupLink = ''
    this.childGroupLink = "";
    this.childExpansion = false;
    this.childGroupItemsLink = "";
    if (this.$route.path !== route) this.$router.push(route);
  }

  handleGroupMenuListItems(link, route) {
    this.link = "";
    // this.childGroupLink = ''
    this.groupLink = link;
    this.childExpansion = false;
    if (route !== undefined && this.$route.path !== route)
      this.$router.push(route);
  }

  handleChildGroupMenuList(link) {
    this.link = "";
    this.childLink = "";
    this.childGroupLink = link;
    this.childExpansion = false;
    this.childGroupItemsLink = "";
  }

  handleChildGroupMenuListItems(link, route, isExpanded) {
    if (this.$q.screen.lt.sm || this.$q.platform.ios || this.$q.platform.mobile)
      this.miniState = true;
    this.childExpansion = isExpanded;
    this.link = "";
    this.childLink = "";
    this.childGroupItemsLink = link;
    if (route)
      this.$router.push(route).catch(err => {
        return err;
      });
  }
}
export default AppDrawer;
</script>

<style lang="sass" scoped>
.my-menu-link
  background: #f5f5f6
  border-left: 3px solid #04acca
  box-shadow: inset 0.1875rem 0 0 #04acca;
  margin: 0 auto

.text-primary
  color: #04acca

.q-icon
  color: #3d5170
</style>
